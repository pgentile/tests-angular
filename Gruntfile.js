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
      files: ['Gruntfile.js', 'app/js/**/*.js'],
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
        removeComments: true
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
        map: {
          sourceContent: true
        }
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
          src: ['images/**/*.{gif,jpeg,jpg,png,svg}'],
          dest: './dist'
        }]
      }
    },
    compress: {
      options: {
        mode: 'gzip'
      },
      dist: {
        files: [{
          expand: true,
          cwd: './dist',
          src: ['**/*.{html,css,js,svg}'],
          dest: './dist',
          rename: function (dest, src) {
            return dest + '/' + src + '.gz';
          }
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
            var gzipStatic = require('connect-gzip-static');
            var livereload = require('connect-livereload');
            
            return [
              livereload(), // TODO Ne fonctionne pas avec les tests Firefox
              connect().use('/static', gzipStatic('./bower_components')),
              gzipStatic('./dist')
            ];
          }
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['app/js/**/*.js'],
        tasks: ['validate', 'uglify', 'newer:compress']
      },
      testScripts: {
        files: ['tests/unit/**/*.spec.js'],
        tasks: ['validate']
      },
      html: {
        files: ['app/**/*.html'],
        tasks: ['newer:htmlmin', 'newer:compress']
      },
      styles: {
        files: ['app/styles/**/*.{less,css}'],
        tasks: ['less', 'autoprefixer', 'newer:compress']
      },
      images: {
        files: ['app/images/**.{gif,jpeg,jpg,png,svg}'],
        tasks: ['newer:imagemin']
      },
      other: {
        files: ['app/r/**'],
        tasks: ['newer:copy']
      },
    },
    karma: {
      options: {
        configFile: 'tests/karma.conf.js'
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
          configFile: 'tests/protractor.conf.js',
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
    'htmlmin', 'uglify', 'less', 'autoprefixer',
    'compress'
  ]);
  grunt.registerTask('test', ['karma:unit', 'connect:server', 'protractor:e2e']);
  grunt.registerTask('dev', ['dist', 'connect:server', 'watch']);
  
  grunt.registerTask('default', ['dist']);
  
};
