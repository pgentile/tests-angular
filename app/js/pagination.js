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
      link: function (scope, element, attrs) {
        var rangeSize = parseInt(attrs.rangeSize) || 10;
        
        scope.range = function () {
          var range = [scope.current];
          var first = scope.current, last = scope.current;
          
          while (range.length < rangeSize && (first > 1 || last < scope.max)) {
            // Mieux vaut avoir des liens pour avancer que pour reculer
            if (range.length < rangeSize && last < scope.max) {
              last++;
              range.push(last);
            }
            if (range.length < rangeSize && first > 1) {
              first--;
              range.unshift(first);
            }
          }
          
          return range;
        };
        
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
