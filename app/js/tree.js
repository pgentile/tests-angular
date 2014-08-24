'use strict';


angular.module('tree', [])
  .directive('tree', function ($compile, $log) {
    return {
      restrict: 'AE',
      controller: function () {
        $log.info('tree - Creating controller');
      },
      compile: function (element) {
        $log.info('tree - Compiling', element.get(0));
        
        var elementClone = element.children().clone();
        var compiled = $compile(elementClone);
        
        return function (scope, element, attrs, controller) {
          $log.info('tree - Linking', element.get(0));
          controller.template = compiled;
          
        };
      }
    };
  })
  .directive('callTree', function ($log) {
    return {
      restrict: 'AE',
      require: '^tree',
      scope: true,
      compile: function (element, attrs) {
        $log.info('callTree - Compiling', element.get(0));
        
        if (angular.isUndefined(attrs.rebind)) {
          throw new Error('Attribut rebind non défini');
        }
        
        return function (scope, element, attrs, controller) {
          $log.info('callTree - Linking', element.get(0));
          $log.info('callTree - Controller =', controller);

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
