'use strict';


angular.module('pagination', [])
  .directive('pagination', function ($log) {
    return {
      restrict: 'E',
      controller: function () {
        this.pages = [1, 2, 3];
        this.currentPage = 1;
        this.lastPage = 3;
        
        this.selectors = [];
        
        this.registerSelector = function (selector) {
          $log.info('Registring ', selector);
          this.selectors.push(selector);
          selector.pagination = this;
        };
        
        this.deregisterSelector = function (selector) {
          $log.error('FIXME Deregister selector', selector);
        };
        
        this.changePage = function (newPage) {
          if (newPage !== this.currentPage) {
            this.currentPage = newPage;
          }
        };
      },
    };
  })
  .directive('pageSelector', function () {
    return {
      restrict: 'E',
      scope: {},
      require: ['pageSelector', '^pagination'],
      controllerAs: 'ctrl',
      controller: function () {
        this.changePage = function (newPage) {
          this.pagination.changePage(newPage);
        };
        
        this.getPages = function () {
          return this.pagination.pages;
        };
        
        this.isPageActive = function (page) {
          return page === this.pagination.currentPage;
        };
      },
      link: function (scope, element, attrs, controllers) {
        var controller = controllers[0];
        var paginationController = controllers[1];
        
        paginationController.registerSelector(controller);
        
        element.on('$destroy', function () {
          paginationController.deregisterSelector(controller);
        });
      },
      templateUrl: '/templates/page-selector.html'
    };
  });
