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
      scope: {},
      transclude: true,
      template: '<ul class="nav navbar-nav" ng-transclude></ul>'
    };
  })
  .directive('navbarLink', function ($compile) {
    return {
      restrict: 'E',
      scope: {
        url: '@',
        active: '='
      },
      transclude: true,
      link: function (scope, element, attrs, controller, transclude) {
        // On fait sauter l'élément transclus en compilant
        var item = $compile(
          '<li ng-class="{ active: active }"><a href="{{ url }}" ng-transclude></a></li>',
          transclude
        );
        item(scope, function (clonedElement, innerScope) {
          element.replaceWith(clonedElement);
        });
      }
    };
  });
