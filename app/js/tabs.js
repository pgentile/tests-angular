'use strict';


angular.module('tabs', [])
  .directive('tabs', function () {
    return {
      restrict: 'E',
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
          console.info("Selected tab :", index);
        
          $scope.tabs.forEach(function (tab) {
            tab.active = false;
          });
          $scope.tabs[index].active = true;
        }
        
        $scope.selectTab = this.selectTab;
      },
      transclude: true,
      template: '<ul class="nav nav-pills"><li ng-repeat="tab in tabs" ng-class="{ active: tab.active }"><a href="" ng-click="selectTab($index)">{{ tab.title }}</a></li></ul><div class="tab-content" ng-transclude></div>'
    };
  })
  .directive('tab', function () {
    return {
      restrict: 'E',
      require:'^tabs',
      scope: {
        active: '='
      },
      transclude: true,
      template: '<div class="tab-pane" ng-transclude ng-show="isActive()"></div>',
      link: function (scope, element, attrs, tabsController) {
        console.info("Link 'tab'", element);
        
        var tab = tabsController.addTab(attrs.title, scope.active);
        scope.isActive = function() {
          console.log("Active ?", tab.active);
          return tab.active;
        }
      }
    };
  });
