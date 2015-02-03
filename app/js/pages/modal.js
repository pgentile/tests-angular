'use strict';


angular.module('testsModal', ['modal'])
  .controller('ModalController', function ($scope, modal) {
    $scope.openModal = function() {
      modal.open('Hello', 'Hello, Cooper !');
    };
  });