'use strict';

module.exports = function(config){
  config.set({

    basePath : '../../',

    files : [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/d3/d3.js',
      'bower_components/flot/jquery.flot.js',
      'app/js/**/*.js',
      'tests/unit/**/*.spec.js'
    ],

    frameworks: ['jasmine'],

    browsers : [
      'Chrome',
      // 'Firefox',
    ],

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
    ],
    
    //autoWatch: false

  });
};
