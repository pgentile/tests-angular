'use strict';


angular.module('navbar', [])
  .directive('ttNavbar', function () {
    return {
      restrict: 'E',
      scope: {
        title: '@'
      },
      templateUrl: '/templates/navbar.html'
    };
  });
