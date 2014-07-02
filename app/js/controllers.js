'use strict';

var dashboardApp = angular.module('dashboardApp', []);

dashboardApp.controller('GraphController', function ($scope) {
  $scope.graphs = [
    {
      title: 'CPU'
    },
    {
      title: 'Mémoire'
    },
    {
      title: 'Disques'
    }
  ];
});
