'use strict';


angular.module('testsErrors', [])
  .controller('TriggerErrorController', function ($scope) {
    
      $scope.triggerError = function () {
        throw new Error('ERROR ERROR ERROR');
      };
      
  });
