'use strict';


angular.module('events', [])
  .directive('windowResize', function ($window, $parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var fn = $parse(attrs.windowResize);
        
        var handler = function (event) {
          scope.$apply(function () {
            fn(scope, { $event: event });
          });
        };
        
        angular.element($window).on('resize', handler);
        
        element.on('$destroy', function () {
          angular.element($window).off('resize', handler);
        });
      }
    };
  });
