'use strict';


angular.module('testsForm', [])
  .controller('FormController', function () {
    
  })
  .directive('showErrors', function () {
    return {
      restrict: 'A',
      require: '^form', // S'assurer qu'on est bien sur le formulaire
      scope: true,
      link: function (scope, element) {
        var controllerNameIndex = 0;
        
        angular.forEach(element.find('.form-group'), function (formGroupElem) {
          formGroupElem = angular.element(formGroupElem);
          var inputElement = angular.element(formGroupElem).find(':input'); // Très certainement du jQuery
          
          var inputController = inputElement.controller('ngModel');
          if (angular.isUndefined(inputController)) {
            return;
          }
          
          // On remplit le scope avec les contrôleurs à surveiller
          var controllerName = 'ctrl' + controllerNameIndex;
          controllerNameIndex++;
          scope[controllerName] = inputController;
          
          var stateProps = ['$invalid', '$dirty'].map(function (value) {
            return controllerName + '.' + value;
          });
          scope.$watchGroup(stateProps, function () {
            formGroupElem.toggleClass('has-error', inputController.$dirty && inputController.$invalid);
            formGroupElem.toggleClass('has-success', inputController.$dirty && inputController.$valid);
          });
        });
      }
    };
  });
