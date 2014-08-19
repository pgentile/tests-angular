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
      files: ['Gruntfile.js', 'app/**/*.js'],
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
          src: ['app/**/*.js'],
          dest: 'dist/js/app.min.js'
        }]
      }
    },
    less: {
      options: {
        cleancss: true,
      },
      dist: {
        files: [{
          src: ['app/**/*.less'],
          dest: 'dist/styles/styles.min.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      dist: {
        src: 'dist/styles/styles.min.css'
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
        files: ['app/**/*.js'],
        tasks: ['validate', 'uglify']
      },
      html: {
        files: ['app/**/*.html'],
        tasks: ['htmlmin']
      },
      styles: {
        files: ['app/styles/**/*.less'],
        tasks: ['less', 'autoprefixer']
      },
      other: {
        files: ['app/r/**'],
        tasks: ['copy']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('validate', ['jshint']);
  
  grunt.registerTask('dist', ['clean', 'validate', 'copy', 'htmlmin', 'uglify', 'less', 'autoprefixer']);
  
  grunt.registerTask('serve', ['dist', 'connect:server', 'watch']);
  
  grunt.registerTask('default', ['dist']);
  
};
