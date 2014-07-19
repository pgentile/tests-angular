'use strict';


angular.module('tabs', [])
  .directive('tabs', function () {
    return {
      restrict: 'E',
      scope: {},
      controller: function ($scope) {
        $scope.tabs = [];
        
        this.addTab = function (title, active, disabled) {
          var tab = {
            title: title,
            active: active,
            disabled: disabled,
          };
          $scope.tabs.push(tab);
          return tab;
        }
        
        this.selectTab = function (index) {
          $scope.tabs.forEach(function (tab) {
            tab.active = false;
          });
          $scope.tabs[index].active = true;
        }
        
        $scope.selectTab = this.selectTab;
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
        active: '=',
        disabled: '='
      },
      transclude: true,
      templateUrl: '/templates/tab-pane.html',
      link: function (scope, element, attrs, tabsController) {
        var tab = tabsController.addTab(attrs.title, scope.active, scope.disabled);
        scope.isActive = function() {
          return tab.active;
        }
      }
    };
  });
