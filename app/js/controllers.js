'use strict';

var dashboardApp = angular.module('dashboardApp', [])
  .factory('alerting', function () {
    return window.alert;
  })
  .filter('upper', function () {
    return function (value) {
      return value.toUpperCase();
    }
  })
  .controller('GraphController', function ($scope, alerting) {
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
  
    $scope.alert = function (name) {
      alerting('Nom actuel : ' + name);
    };
  
  })
  .controller('EventWatcherController', function ($scope) {
    $scope.eventsAddedCount = 0;
    
    $scope.$on('newEventAdded', function () {
      $scope.eventsAddedCount += 1;
    });
  })
  .controller('EventController', function ($scope) {
    $scope.events = [];
    
    $scope.add = function () {
      var num = $scope.events.length + 1;
      $scope.events.push('Event #' + num);
      
      $scope.$emit('newEventAdded');
    };
  });