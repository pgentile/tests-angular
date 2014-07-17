'use strict';


angular.module('tabs', [])
  .directive('tabs', function () {
    return {
      restrict: 'E',
      scope: {},
      controller: function ($scope) {
        console.info("Controller 'tabs'");
        
        $scope.tabs = [];
        
        this.addTab = function (title, active) {
          var tab = {
            title: title,
            active: active,
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
      link: function (scope, element, attrs, tabsController) {
        console.info("Link 'tabs'", element);
      },
      transclude: true,
      template: '<ul class="nav nav-pills"><li ng-repeat="tab in tabs" ng-class="{ active: tab.active }"><a href="" ng-click="selectTab($index)">{{ tab.title }}</a></li></ul><div class="tab-content" ng-transclude></div>'
    };
  })
  .directive('tab', function () {
    return {
      restrict: 'E',
      require:'^tabs',
      scope: false,
      transclude: true,
      template: '<div class="tab-pane" ng-transclude ng-show="isActive()"></div>',
      link: function (scope, element, attrs, tabsController) {
        console.info("Link 'tab'", element);
        
        var tab = tabsController.addTab(attrs.title, attrs.active || false);
        scope.isActive = function() {
          return tab.active;
        }
      }
    };
  });
