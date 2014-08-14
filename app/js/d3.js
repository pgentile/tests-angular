'use strict';


angular.module('d3', [])
  .constant('d3', d3)
  .directive('d3', function () {
    return {
      restrict: 'E',
      scope: {
        'data': '=',
        'update': '='
      },
      link: function (scope, element) {
        var domElement = element.get(0);
        
        scope.$watchCollection('data', function (data) {
          return scope.update(domElement, data);
        });
      }
    };
  });
