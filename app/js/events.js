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
        
        $($window).on('resize', handler);
        
        element.on('$destroy', function () {
          $($window).off('resize', handler);
        });
      }
    };
  });
