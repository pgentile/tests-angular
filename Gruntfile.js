'use strict';

module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'Gruntfile.js',
        'app/js/**/*.js',
      ],
      options: {
        node: true,
        browser: true,
        unused: true,
        strict: true,
        esnext: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: 'single',
        regexp: true,
        undef: true,
        trailing: true,
        smarttabs: true,
        globals: {
          angular: false,
          d3: false
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  /*
  grunt.registerTask('test', 'Test', function (target) {
    grunt.log.warn("Salut");
  });
  */
  
  grunt.registerTask('default', ['jshint']);
  
};
