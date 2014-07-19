'use strict';


angular.module('dashboard', ['ngAnimate', 'navbar', 'tabs'])
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
  .directive('debugScope', function () {
    return {
      restrict: 'E',
      scope: true,
      link: function (scope, element, attrs) {
        console.info("debug-scope", scope);
        
        scope.scopeIds = [];
        
        var currentScope = scope.$parent;
        while (currentScope !== null) {
          scope.scopeIds.push(currentScope.$id);
          currentScope = currentScope.$parent;
        }
        
      },
      template: '<div><p><b>DEBUG SCOPE</b></p><p>Hiérarchie = {{ scopeIds }}</p></div>'
    };
  });

