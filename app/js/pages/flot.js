'use strict';


angular.module('testsFlot', ['flot'])
  .controller('FlotController', function ($scope, $log) {
    
    var generateSerie = function (count, scale, start, prev) {
      var generateRandomNumber = function () {
        return (Math.random() >= 0.5 ? 1 : -1) * Math.random() * scale;
      };
      
      start = start || 0;
      prev = prev || generateRandomNumber();
      
      var serie = [];
      var value = prev;
      for (var i = start; i < count + start; i++) {
        value += generateRandomNumber();
        serie.push([i, value]);
      }
      return serie;
    };
    
    var nb = 200;
    var scale = 50;
    $scope.series = [
      generateSerie(nb, scale),
      generateSerie(nb, scale),
      generateSerie(nb, scale)
    ];
    
    $scope.addData = function () {
      $log.info('Ajout de données dans les séries');
      
      $scope.series = $scope.series.map(function (serie) {
        var last = serie[serie.length - 1][1];
        return serie.concat(generateSerie(nb / 10, scale, serie.length, last));
      });
    };
    
    $scope.addSerie = function () {
      $log.info('Ajouter une série');
      
      var nbPoints = nb;
      if ($scope.series.length > 0) {
        nbPoints = $scope.series[0].length;
      }
      
      $scope.series.push(generateSerie(nbPoints, scale));
    };
    
    $scope.clear = function () {
      $scope.series = [];
    };
    
  });
