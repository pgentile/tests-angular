'use strict';


angular.module('testsHome', ['modal'])
  .factory('alerting', function ($window) {
    return $window.alert;
  })
  .controller('SalutController', function ($scope, modal) {
    $scope.name = '';

    $scope.alert = function (name) {
      modal.open(name, 'Salut, ' + name + ' !');
    };
  });
