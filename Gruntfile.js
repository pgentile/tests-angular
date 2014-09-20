'use strict';

module.exports = function(grunt) {
  
  // Analyser les perfs du build Grunt
  // require('time-grunt')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: './dist'
    },
    jshint: {
      files: ['Gruntfile.js', 'app/js/*.js'],
      options: {
        jshintrc: 'jshintrc.json'
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: './app',
          src: ['r/**'],
          dest: './dist',
          filter: 'isFile'
        }]
      }
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseBooleanAttributes: false, // Provoque des bugs avec AngularJS
        removeCommentsFromCDATA: true,
        removeOptionalTags: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: './app',
          src: ['**/*.html'],
          dest: './dist'
        }]
      }
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap: true,
        sourceMapIncludeSources: true
      },
      dist: {
        files: [{
          src: ['app/js/**/*.js'],
          dest: 'dist/js/app.min.js'
        }]
      }
    },
    less: {
      options: {
        cleancss: true,
        sourceMap: true,
        sourceMapFilename: 'dist/styles/styles.min.css.map',
        outputSourceFiles: true
      },
      dist: {
        files: [{
          src: 'app/styles/styles.less',
          dest: 'dist/styles/styles.min.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 version'],
        // Pas de map correcte générée en entrée
        // map: true
      },
      dist: {
        src: 'dist/styles/styles.min.css'
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: './app',
          src: ['images/**/*.{gif,jpeg,jpg,jpe,png,svg}'],
          dest: './dist'
        }]
      }
    },
    connect: {
      options: {
        port: 3000
      },
      server: {
        options: {
          middleware: function (connect) {
            return [
              connect().use('/static', connect.static('./bower_components')),
              connect.static('./dist')
            ];
          }
        }
      }
    },
    watch: {
      scripts: {
        files: ['app/js/**/*.js', 'tests/unit/**/*.spec.js'],
        tasks: ['validate', 'uglify']
      },
      html: {
        files: ['app/**/*.html'],
        tasks: ['newer:htmlmin']
      },
      styles: {
        files: ['app/styles/**/*.less'],
        tasks: ['less', 'autoprefixer']
      },
      images: {
        files: ['app/images/**'],
        tasks: ['newer:imagemin']
      },
      other: {
        files: ['app/r/**'],
        tasks: ['newer:copy']
      },
    },
    karma: {
      options: {
        configFile: 'tests/unit/karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      watch: {
        background: true
      }
    },
    protractor: {
      e2e: {
        options: {
          configFile: 'tests/e2e/protractor.conf.js',
          args: {
            baseUrl: 'http://localhost:3000'
          }
        }
      }
    }
  });
  
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('validate', ['jshint']);
  grunt.registerTask('dist', [
    'clean', 'validate', 'copy', 'imagemin',
    'htmlmin', 'uglify', 'less', 'autoprefixer'
  ]);
  grunt.registerTask('test', ['karma:unit', 'connect:server', 'protractor:e2e']);
  grunt.registerTask('dev', ['dist', 'connect:server', 'watch']);
  
  grunt.registerTask('default', ['dist']);
  
};
