'use strict';


angular.module('testsGraphs', [])
  .filter('upper', function () {
    return function (value) {
      return value.toUpperCase();
    };
  })
  .controller('GraphController', function ($scope) {
    $scope.graphs = [
      {
        id: 4,
        title: 'CPU'
      },
      {
        id: 65,
        title: 'Mémoire'
      },
      {
        id: 17,
        title: 'Disques'
      }
    ];
  });
