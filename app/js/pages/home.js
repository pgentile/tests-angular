'use strict';


angular.module('testsHome', [])
  .factory('alerting', function ($window) {
    return $window.alert;
  })
  .controller('SalutController', function ($scope, alerting) {
    $scope.name = '';
    
    $scope.alert = function (name) {
      alerting('Salut, ' + name + ' !');
    };
  });
