'use strict';


angular.module('testResize', ['events'])
  .controller('ResizeController', function ($scope, $log) {
    $scope.logEvent = function (event) {
      $log.info('Event =', event);
    };
  });
