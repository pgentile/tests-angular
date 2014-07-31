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
      link: function (scope, element, attrs, ctrl, transclude) {
        var template = $compile('<li ng-class="{ active: active }"><a href="{{ url }}"></a></li>');
        template(scope, function (templateClone) {
          element.append(templateClone);
          
          transclude(function (transcludeClone) {
            element.find('li > a').append(transcludeClone);
            element.replaceWith(element.find('li'));
          });
        });
      }
    };
  });
