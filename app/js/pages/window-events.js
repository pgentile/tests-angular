'use strict';


angular.module('testWindowEvents', ['events'])
  .controller('WindowEventsController', function ($scope, $log) {
    $scope.logEvent = function (event) {
      $log.info('Event =', event);
    };
  });
