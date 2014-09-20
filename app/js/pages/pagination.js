'use strict';


angular.module('testsPagination', ['pagination'])
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
  });
