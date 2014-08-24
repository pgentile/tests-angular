'use strict';


angular.module('tree', [])
  .directive('tree', function ($compile, $log) {
    return {
      restrict: 'A',
      scope: true,
      controller: function () {
        $log.info('tree - Creating controller');
        
        this.recall = null;
        
        this.setRecall = function (recall) {
          $log.info('tree - Set recall');
          this.recall = recall;
        };
      },
      compile: function (element) {
        $log.info('tree - Compiling', element.get(0));
        
        var elementClone = element.clone();
        elementClone.removeAttr('tree');
        
        var compiled = $compile(elementClone);
        
        return function (scope, element, attrs, controller) {
          $log.info('tree - Linking', element.get(0));
          controller.setRecall(compiled);
          
        };
      }
    };
  })
  .directive('callTree', function ($log) {
    return {
      restrict: 'AE',
      require: '^tree',
      scope: true,
      compile: function (element) {
        $log.info('callTree - Compiling', element.get(0));
        
        return function (scope, element, attrs, controller) {
          $log.info('callTree - Linking', element.get(0));
          $log.info('callTree - Controller =', controller);

          // Toute la magie est ici : on écrase dans le scope descendant
          // la variable de scope sur laquelle appliquer la récursion.
          scope[attrs.varName] = scope.$eval(attrs.value);
          
          controller.recall(scope, function (cloned) {
            element.append(cloned);
          });
        };
      }
    };
  });
