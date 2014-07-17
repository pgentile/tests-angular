'use strict';


angular.module('navbar', [])
  .directive('ttNavbar', function () {
    return {
      restrict: 'E',
      scope: {
        title: '=title'
      },
      templateUrl: '/templates/navbar.html'
    };
  });
