'use strict';


angular.module('dashboard', ['ngAnimate', 'navbar', 'tabs'])
  .config(function ($logProvider) {
    $logProvider.debugEnabled(true);
  })
  .factory('alerting', function () {
    return window.alert;
  })
  .filter('upper', function () {
    return function (value) {
      return value.toUpperCase();
    }
  })
  .controller('TrucsController', function ($scope) {
    $scope.trucs = [1, 2, 3];
    
    $scope.addTruc = function () {
      $scope.trucs.push($scope.trucs.length + 1);
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
      $scope.eventsAddedCount++;
    });
    $scope.$on('eventRemoved', function () {
      $scope.eventsAddedCount--;
    });
  })
  .controller('EventController', function ($scope) {
    $scope.events = [];
    
    $scope.add = function () {
      var num = $scope.events.length + 1;
      $scope.events.push('Event #' + num);
      
      $scope.$emit('newEventAdded'); // Envoi vers le contrôleur parent
    };
    
    $scope.remove = function () {
      if ($scope.events.pop() !== undefined) {
        $scope.$emit('eventRemoved');
      }
    };
  })
  .directive('myAddClass', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $timeout(function () {
          element.addClass("added");
        }, 1);
      }
    }
  })
  .directive('debugScope', function ($log) {
    return {
      restrict: 'E',
      scope: true,
      link: function (scope, element, attrs) {
        $log.debug("debug-scope : scope =", scope);
        $log.debug("debug-scope : element =", element);
        
        scope.scopeIds = [];
        
        var currentScope = scope.$parent;
        while (currentScope !== null) {
          scope.scopeIds.push(currentScope.$id);
          currentScope = currentScope.$parent;
        }
        
      },
      template: '<div><p><b>DEBUG SCOPE</b></p><p>Hiérarchie = <code>{{ scopeIds }}</code></p></div>'
    };
  });

