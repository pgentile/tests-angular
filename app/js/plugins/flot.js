'use strict';


angular.module('flot', ['events'])
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
        
          scope.redrawOnWindowResize = function () {
            $log.debug('Fenêtre retaillée');
          
            plot.resize();
            plot.setupGrid();
            plot.draw();
          };
        });
      },
      templateUrl: '/templates/flot.html'
    };
  });
