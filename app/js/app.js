'use strict';


angular.module(
  'tests',
  [
    // AngularJS
    'ngAnimate', 'ngRoute',
    // Pages
    'testsGraphs', 'testsD3', 'testsErrors', 'testsEvents',
    'testsFlot', 'testsForm', 'testsHome', 'testsPagination',
    'testWindowEvents', 'testsTree', 'testsTrucs'
  ]
)
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
  .constant('pages', [
    {
      name: 'Accueil',
      url: '/home',
      templateUrl: 'pages/home.html',
      default: true
    },
    {
      name: 'Angular classique',
      group: true,
      subPages: [
        {
          name: 'Graphes',
          url: '/graphs',
          templateUrl: 'pages/graphs.html',
          controller: 'GraphController'
        },
        {
          name: 'Formulaire',
          url: '/form',
          templateUrl: 'pages/form.html',
          controller: 'FormController'
        },
        {
          name: 'Evénements',
          url: '/events',
          templateUrl: 'pages/events.html',
          controller: 'EventWatcherController'
        }
      ]
    },
    {
      name: 'Intégration',
      group: true,
      subPages: [
        {
          name: 'Trucs',
          url: '/trucs',
          templateUrl: 'pages/trucs.html',
          controller: 'TrucsController'
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
          name: 'Pagination',
          url: '/pagination',
          templateUrl: 'pages/pagination.html',
          controller: 'PaginationController'
        }
      ]
    },
    {
      name: 'Evénements fenêtre',
      url: '/window-events',
      templateUrl: 'pages/window-events.html',
      controller: 'WindowEventsController'
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
      var registerPage = function (page) {
        $routeProvider.when(page.url, {
          templateUrl: page.templateUrl,
          controller: page.controller
        });
        if (page.default === true) {
          $routeProvider.otherwise({
            redirectTo: page.url
          });
        }
      };
    
      angular.forEach(pages, function (page) {
        if (page.group === true) {
          angular.forEach(page.subPages, registerPage);
        }
        else {
          registerPage(page);
        }
      });
  })
  .controller('MainNavController', function ($scope, $log, $location, pages) {
    $scope.pages = pages;
    
    $scope.isActive = function (page) {
      if (page.group === true) {
        var subPageFound = false;
        
        angular.forEach(page.subPages, function (subPage) {
          subPageFound = subPageFound || $location.path() === subPage.url;
        });
        
        return subPageFound;
      }
      return $location.path() === page.url;
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
    
  });
