'use strict';


angular.module('testsTrucs', ['tabs'])
  .controller('TrucsController', function ($scope) {
    $scope.trucs = [];
    for (var i = 0; i < 7; i++) {
      $scope.trucs.push({
        num: i + 1,
        disabled: i % 2 === 1
      });
    }
    
    $scope.addTruc = function () {
      $scope.trucs.push({
        num: $scope.trucs.length + 1,
        active: false,
        disabled: false
      });
    };
  });
