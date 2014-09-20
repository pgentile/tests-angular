'use strict';


angular.module('testsTree', ['recursive'])
  .controller('TreeController', function ($scope) {
    $scope.x = 'XXX';
    $scope.elements = ['A', 'B', 'C'];
    
    $scope.addParent = function () {
      $scope.arbre.push({
        name: 'New parent',
        children: []
      });
    };
    
    $scope.addChild = function (parent) {
      parent.children.push({
        name: 'New child',
        children: []
      });
    };
    
    $scope.arbre = [
      {
        name: 'Parent 1',
        children: [
          {
            name: 'Child 1.1',
            children: [
              {
                name: 'Sub child 1.1.1',
                children: []
              },
              {
                name: 'Sub child 1.1.2',
                children: []
              }
            ]
          },
          {
            name: 'Child 1.2',
            children: []
          }
        ]
      },
      {
        name: 'Parent 2',
        children: [
          {
            name: 'Child 2.1',
            children: []
          },
          {
            name: 'Child 2.2',
            children: []
          }
        ]
      },
    ];
  });
