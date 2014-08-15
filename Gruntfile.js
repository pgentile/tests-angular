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
        mangle: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: './app',
          src: ['**/*.js'],
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
        files: ['app/**/*.js'],
        tasks: ['validate', 'uglify']
      },
      html: {
        files: ['app/**/*.html'],
        tasks: ['htmlmin']
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('validate', ['jshint']);
  
  grunt.registerTask('dist', ['clean', 'copy', 'htmlmin', 'uglify']);
  
  grunt.registerTask('serve', ['dist', 'connect:server', 'watch']);
  
  grunt.registerTask('default', ['validate', 'dist']);
  
};
