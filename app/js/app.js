'use strict';


angular.module('dashboard', ['ngAnimate', 'ngRoute', 'tabs', 'd3'])
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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'pages/home.html'
      })
      .when('/trucs', {
        templateUrl: 'pages/trucs.html',
        controller: 'TrucsController'
      })
      .when('/graphs', {
        templateUrl: 'pages/graphs.html',
        controller: 'GraphController'
      })
      .when('/events', {
        templateUrl: 'pages/events.html',
        controller: 'EventWatcherController'
      })
      .when('/d3', {
        templateUrl: 'pages/d3.html',
        controller: 'D3Controller'
      })
      .when('/flot', {
        templateUrl: 'pages/flot.html',
        controller: 'FlotController'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })
  .controller('MainNavController', function ($scope, $log, $location) {
    $scope.isActive = function (routeName) {
      return $location.path() === routeName;
    };
    
    $scope.$on('$routeChangeSuccess', function () {
      $log.info('Route modifiee =', $location.path());
    });
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
  .controller('FlotController', function ($scope, $log) {
    
    var generateSerie = function (count, scale, start, prev) {
      var generateRandomNumber = function () {
        return (Math.random() >= 0.5 ? 1 : -1) * Math.random() * scale;
      };
      
      start = start || 0;
      prev = prev || generateRandomNumber();
      
      var serie = [];
      var value = prev;
      for (var i = start; i < count + start; i++) {
        value += generateRandomNumber();
        serie.push([i, value]);
      }
      return serie;
    };
    
    var nb = 200;
    var scale = 50;
    $scope.series = [
      generateSerie(nb, scale),
      generateSerie(nb, scale),
      generateSerie(nb, scale)
    ];
    
    $scope.addData = function () {
      $log.info('Ajout de données dans les séries');
      
      $scope.series = $scope.series.map(function (serie) {
        var last = serie[serie.length - 1][1];
        return serie.concat(generateSerie(nb / 10, scale, serie.length, last));
      });
    };
    
    $scope.addSerie = function () {
      $log.info('Ajouter une série');
      
      var nbPoints = nb;
      if ($scope.series.length > 0) {
        nbPoints = $scope.series[0].length;
      }
      
      $scope.series.push(generateSerie(nbPoints, scale));
    };
    
    $scope.clear = function () {
      $scope.series = [];
    };
    
  })
  .directive('flot', function ($timeout, $window, $log) {
    return {
      restrict: 'E',
      scope: {
        series: '=',
        height: '@'
      },
      link: function (scope, element) {
        // Utilisation d'un timeout car sinon, flot n'arrive pas à déterminer
        // la hauteur du placeholder (balise div)
        $timeout(function () {
          var plot = element.children('div')
            .plot(scope.series)
            .data('plot');
            
          scope.$watchCollection('series', function (updatedSeries) {
            $log.info('Mise à jour du graphe en cours');
            
            plot.setData(updatedSeries);
            plot.setupGrid();
            plot.draw();
          });
          
          var redrawOnWindowResize = function () {
            $log.info('Fenêtre retaillée');
            
            plot.resize();
            plot.setupGrid();
            plot.draw();
          };
          
          $($window).on('resize', redrawOnWindowResize);
          
          $log.info('SCOPE =', scope);
          
          scope.$on('$destroy', function () {
            $($window).off('resize', redrawOnWindowResize);
          });
        }, 1);
      },
      template: '<div ng-style="{ height: height + \'px\' }"></div>'
    };
  });

