'use strict';


angular.module('tabs', [])
  .directive('tabs', function () {
    return {
      restrict: 'E',
      scope: {},
      controllerAs: 'ctrl',
      controller: function ($scope, $log) {
        $scope.tabs = [];
        $scope.activeTab = null;
        
        this.addTab = function (tab) {
          $scope.tabs.push(tab);
        };
        
        this.selectTab = function (selectedTab) {
          if (!selectedTab.disabled) {
            $scope.activeTab = selectedTab;
          }
        };
        
        this.isTabActive = function(tab) {
          return tab === $scope.activeTab;
        };
      },
      transclude: true,
      templateUrl: '/templates/tabs.html'
    };
  })
  .directive('tab', function () {
    return {
      restrict: 'E',
      require:'^tabs',
      scope: {
        title: '@',
        active: '=',
        disabled: '='
      },
      transclude: true,
      templateUrl: '/templates/tab-pane.html',
      link: function (scope, element, attrs, tabsController) {
        var tab = {
          title: scope.title,
          disabled: scope.disabled
        };
        tabsController.addTab(tab);
        
        scope.isActive = function() {
          return tabsController.isTabActive(tab);
        };
        
        if (scope.active) {
          tabsController.selectTab(tab);
        }
      }
    };
  });
