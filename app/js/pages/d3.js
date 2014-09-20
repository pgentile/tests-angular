'use strict';


angular.module('testsD3', ['d3'])
  .controller('D3Controller', function ($scope, $log, $http) {
    $scope.data = [];
    
    $http.get('/r/d3data.json')
      .success(function (data) {
        $log.info('Données récupérées');
        $scope.data = angular.fromJson(data);
      });
    
    $scope.updateMe = function (element, data) {
      var paragraphs = d3.select(element)
        .selectAll('p')
        .data(data);

      paragraphs.enter()
          .append('p')
          .text(function (d) { return d; });

      paragraphs.text(function (d) { return d; });
        
      paragraphs.exit()
        .remove();
    };
    
    $scope.addNumber = function () {
      $log.info('Ajouter un nombre');
      $scope.data.push($scope.data.length + 1);
    };
  });
