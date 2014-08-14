'use strict';


angular.module('dashboard', ['ngAnimate', 'navbar', 'tabs', 'd3'])
  .config(function ($logProvider) {
    $logProvider.debugEnabled(false);
  })
  .factory('alerting', function ($window) {
    return $window.alert;
  })
  .filter('upper', function () {
    return function (value) {
      return value.toUpperCase();
    };
  })
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
  })
  .controller('SalutController', function ($scope, alerting) {
    $scope.name = '';
    
    $scope.alert = function (name) {
      alerting('Salut, ' + name + ' !');
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
      link: function (scope, element) {
        $timeout(function () {
          element.addClass('added');
        }, 1);
      }
    };
  })
  .directive('debugScope', function ($log) {
    return {
      restrict: 'E',
      scope: true,
      link: function (scope, element) {
        $log.debug('debug-scope : scope =', scope);
        $log.debug('debug-scope : element =', element);
        
        scope.scopeIds = [];
        
        var currentScope = scope.$parent;
        while (currentScope !== null) {
          scope.scopeIds.push(currentScope.$id);
          currentScope = currentScope.$parent;
        }
        
      },
      template: '<div><p><b>DEBUG SCOPE</b></p><p>Hiérarchie = <code>{{ scopeIds }}</code></p></div>'
    };
  })
  .controller('D3Controller', function ($scope, $log, $http) {
    $scope.data = [];
    
    $http.get('/r/d3data.json')
      .success(function (data) {
        $log.info('Données récupérées');
        $scope.data = angular.fromJson(data);
      });
    
    $scope.updateMe = function (element, data) {
      var paragraphs = d3.select(element)
        .selectAll('p')
        .data(data);

      paragraphs.enter()
          .append('p')
          .text(function (d) { return d; });

      paragraphs.text(function (d) { return d; });
        
      paragraphs.exit()
        .remove();
    };
    
    $scope.addNumber = function () {
      $log.info('Ajouter un nombre');
      $scope.data.push($scope.data.length + 1);
    };
  })
  .controller('NavbarController', function ($scope) {
    $scope.links = [
      {
        name: 'Link 1',
        url: '#link1',
        active: false
      },
      {
        name: 'Link 2',
        url: '#link2',
        active: true
      },
      {
        name: 'Link 3',
        url: '#link3',
        active: false
      }
    ];
    
    $scope.addLink = function () {
      $scope.links.push({
        name: 'NEW LINK',
        url: '#new-link',
        active: false
      });
    };
  });
  

