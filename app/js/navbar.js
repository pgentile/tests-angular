'use strict';


angular.module('navbar', [])
  .directive('navbar', function () {
    return {
      restrict: 'E',
      scope: {
        title: '@'
      },
      transclude: true,
      templateUrl: '/templates/navbar.html'
    };
  })
  .directive('navbarList', function () {
    return {
      restrict: 'E',
      transclude: true,
      template: '<ul class="nav navbar-nav" ng-transclude></ul>',
    };
  })
  .directive('navbarLink', function ($compile, $log) {
    return {
      restrict: 'E',
      scope: {
        url: '@',
        active: '='
      },
      transclude: true,
      template: '<li ng-class="{ active: active }"><a href="{{ url }}" ng-transclude></a></li>',
      link: function (scope, element, attrs, ctrl, transclude) {
        element.find("li").unwrap();
      }
    };
  });
