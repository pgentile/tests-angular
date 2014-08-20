'use strict';


angular.module('pagination', [])
  .filter('maxPageForItems', function () {
    return function (count, perPage) {
      return Math.max(1, Math.ceil(count / perPage));
    };
  })
  .directive('pageSelector', function () {
    return {
      restrict: 'E',
      scope: {
        current: '=',
        max: '=',
        changePage: '&'
      },
      link: function (scope) {
        // TODO Utiliser scope.$watchGroup avec Angular 1.3
        angular.forEach(['current', 'max'], function (expr) {
          scope.$watch(expr, function () {
            scope.pages = [];
            for (var i = 0; i < Math.max(1, scope.max); i++) {
              scope.pages.push(i + 1);
            }
          });
        });
        
        scope.isPageActive = function (page) {
          return scope.current === page;
        };
        
        scope.triggerPageChange = function (newPage) {
          if (newPage !== scope.current && newPage >= 1 && newPage <= scope.max) {
            scope.current = newPage;
            scope.changePage({ page: newPage });
          }
        };
      },
      templateUrl: '/templates/page-selector.html'
    };
  });
