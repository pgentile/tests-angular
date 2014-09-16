'use strict';


angular.module('tests', ['ngAnimate', 'ngRoute', 'tabs', 'd3', 'flot', 'pagination', 'recursive'])
  .constant('production', true)
  .config(function ($logProvider, production) {
    $logProvider.debugEnabled(production !== true);
  })
  // TODO Activer quand AngularJS 1.3 sera sorti
  // .config(function ($compileProvider, production) {
  //   $compileProvider.debugInfoEnabled(production !== true);
  // })
  .config(function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  })
  .factory('alerting', function ($window) {
    return $window.alert;
  })
  .filter('upper', function () {
    return function (value) {
      return value.toUpperCase();
    };
  })
  .constant('pages', [
    {
      name: 'Accueil',
      url: '/home',
      templateUrl: 'pages/home.html'
    },
    {
      name: 'Trucs',
      url: '/trucs',
      templateUrl: 'pages/trucs.html',
      controller: 'TrucsController'
    },
    {
      name: 'Graphes',
      url: '/graphs',
      templateUrl: 'pages/graphs.html',
      controller: 'GraphController'
    },
    {
      name: 'Evénements',
      url: '/events',
      templateUrl: 'pages/events.html',
      controller: 'EventWatcherController'
    },
    {
      name: 'D3',
      url: '/d3',
      templateUrl: 'pages/d3.html',
      controller: 'D3Controller'
    },
    {
      name: 'Flot',
      url: '/flot',
      templateUrl: 'pages/flot.html',
      controller: 'FlotController'
    },
    {
      name: 'Resize',
      url: '/resize',
      templateUrl: 'pages/resize.html',
      controller: 'ResizeController'
    },
    {
      name: 'Pagination',
      url: '/pagination',
      templateUrl: 'pages/pagination.html',
      controller: 'PaginationController'
    },
    {
      name: 'Erreurs',
      url: '/errors',
      templateUrl: 'pages/errors.html',
      controller: 'TriggerErrorController'
    },
    {
      name: 'Tree',
      url: '/tree',
      templateUrl: 'pages/tree.html',
      controller: 'TreeController'
    }
  ])
  .config(function ($routeProvider, pages) {
      angular.forEach(pages, function (page) {
        $routeProvider.when(page.url, {
          templateUrl: page.templateUrl,
          controller: page.controller
        });
      });
      
      $routeProvider.otherwise({
        redirectTo: '/home'
      });
  })
  .controller('MainNavController', function ($scope, $log, $location, pages) {
    $scope.pages = [];
    angular.forEach(pages, function (page) {
      $scope.pages.push({
        name: page.name,
        url: page.url
      });
    });
    
    $scope.isActive = function (routeName) {
      return $location.path() === routeName;
    };
    
    $scope.$on('$routeChangeSuccess', function () {
      $log.info('Route modifiee =', $location.path());
    });
  })
  .factory('$exceptionHandler', function ($injector, $log) {
    return function (exception, cause) {
      $log.error('Exception = ', exception);
      $log.error('Cause =', cause);
      
      var rootScope = $injector.get('$rootScope');
      rootScope.$broadcast('exceptionCaught', {
        exception: exception,
        cause: cause
      });
    };
  })
  .controller('ErrorController', function ($scope) {
    
    $scope.$on('exceptionCaught', function (event, args) {
      $scope.errMessage = args.exception.message;
    });  
    
  })
  .controller('TriggerErrorController', function ($scope) {
    
      $scope.triggerError = function () {
        throw new Error('ERROR ERROR ERROR');
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
  .controller('ResizeController', function ($scope, $log) {
    $scope.logEvent = function (event) {
      $log.info('Event =', event);
    };
  })
  .controller('PaginationController', function ($scope, $log, $filter) {
    $scope.currentPage = 1;
    $scope.count = 65;
    $scope.itemsPerPage = 10;
    
    var maxPageForItems = $filter('maxPageForItems');
    // TODO Utiliser scope.$watchGroup avec Angular 1.3
    angular.forEach(['count', 'itemsPerPage'], function (expr) {
      $scope.$watch(expr, function () {
        var maxPage = maxPageForItems($scope.count, $scope.itemsPerPage);
        if ($scope.currentPage > maxPage) {
          $scope.currentPage = maxPage;
        }
      });
    });
    
    $scope.loadPage = function (page) {
      $log.info('Page changed to', page);
    };
  })
  .controller('TreeController', function ($scope) {
    $scope.x = 'XXX';
    $scope.elements = ['A', 'B', 'C'];
    
    $scope.addParent = function () {
      $scope.arbre.push({
        name: 'New parent',
        children: []
      });
    };
    
    $scope.addChild = function (parent) {
      parent.children.push({
        name: 'New child',
        children: []
      });
    };
    
    $scope.arbre = [
      {
        name: 'Parent 1',
        children: [
          {
            name: 'Child 1.1',
            children: [
              {
                name: 'Sub child 1.1.1',
                children: []
              },
              {
                name: 'Sub child 1.1.2',
                children: []
              }
            ]
          },
          {
            name: 'Child 1.2',
            children: []
          }
        ]
      },
      {
        name: 'Parent 2',
        children: [
          {
            name: 'Child 2.1',
            children: []
          },
          {
            name: 'Child 2.2',
            children: []
          }
        ]
      },
    ];
  });
