'use strict';


(function (angular) {
  
  var windowEvents = [
    'resize',
    'scroll'
  ];
  
  var buildDirective = function (eventName) {
    return function ($window, $parse) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var fn = $parse(attrs.windowResize);

          var handler = function (event) {
            scope.$apply(function () {
              fn(scope, { $event: event });
            });
          };

          angular.element($window).on(eventName, handler);

          element.on('$destroy', function () {
            angular.element($window).off(eventName, handler);
          });
        }
      };
    };
  };
  
  var eventsModule = angular.module('events', []);
  
  angular.forEach(windowEvents, function (eventName) {
    var directiveName = 'window' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
    eventsModule.directive(directiveName, buildDirective(eventName));
  });
  
})(angular);
