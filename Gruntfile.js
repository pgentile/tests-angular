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
        }]
      }
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseBooleanAttributes: true,
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
          cwd: './app/js',
          src: ['**.js'],
          dest: './dist/js'
        }]
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          keepalive: true,
          middleware: function (connect) {
            return [
              connect().use('/static', connect.static('./bower_components')),
              connect.static('./dist')
            ];
          }
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('dist', ['clean', 'copy', 'htmlmin', 'uglify'])
  
  grunt.registerTask('serve', ['dist', 'connect:server'])
  
  grunt.registerTask('default', ['dist']);
  
};
