'use strict';


angular.module('tree', [])
  .directive('tree', function ($compile) {
    return {
      restrict: 'AE',
      controller: function () {
        this.template = null;
      },
      compile: function (element) {
        var elementClone = element.children().clone();
        var compiled = $compile(elementClone);
        
        return function (scope, element, attrs, controller) {
          controller.template = compiled;
          
        };
      }
    };
  })
  .directive('callTree', function () {
    return {
      restrict: 'AE',
      require: '^tree',
      scope: true,
      compile: function (element, attrs) {
        if (angular.isUndefined(attrs.rebind)) {
          throw new Error('Attribut rebind non défini');
        }
        
        return function (scope, element, attrs, controller) {
          // Toute la magie est ici : on écrase dans le scope descendant
          // la variable de scope sur laquelle appliquer la récursion.
          // scope[attrs.varName] = scope.$eval(attrs.value);
          scope.$eval(attrs.rebind);
          
          controller.template(scope, function (cloned) {
            element.append(cloned);
          });
        };
      }
    };
  });
