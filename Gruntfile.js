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
      main: {
        files: [
          {
            expand: true,
            cwd: './app',
            src: '**',
            dest: './dist',
          }
        ]
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
  
  grunt.registerTask('build', ['clean', 'copy'])
  
  grunt.registerTask('serve', ['build', 'connect:server'])
  
  grunt.registerTask('default', ['build']);
  
};
