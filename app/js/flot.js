'use strict';


angular.module('flot', [])
  .directive('flot', function ($timeout, $window, $log) {
    return {
      restrict: 'E',
      scope: {
        series: '=',
        height: '@'
      },
      link: function (scope, element) {
        // Utilisation d'un timeout car sinon, flot n'arrive pas à déterminer
        // la hauteur du placeholder (balise div)
        $timeout(function () {
          var plot = element.children('div')
            .plot(scope.series)
            .data('plot');
          
          scope.$watchCollection('series', function (updatedSeries) {
            $log.debug('Mise à jour du graphe en cours');
          
            plot.setData(updatedSeries);
            plot.setupGrid();
            plot.draw();
          });
        
          var redrawOnWindowResize = function () {
            $log.debug('Fenêtre retaillée');
          
            plot.resize();
            plot.setupGrid();
            plot.draw();
          };
        
          $($window).on('resize', redrawOnWindowResize);
        
          scope.$on('$destroy', function () {
            $($window).off('resize', redrawOnWindowResize);
          });
        }, 1);
      },
      template: '<div ng-style="{ height: height + \'px\' }"></div>'
    };
  });
