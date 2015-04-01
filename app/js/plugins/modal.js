'use strict';


angular.module('modal', [])
  .factory('modal', function ($log, $templateRequest, $rootScope, $document, $compile) {
    var templateUrl = '/templates/modal.html';
    
    var template = $templateRequest(templateUrl)
      .then(function (data) {
        return $compile(data);
      });
    
    return {
      open: function(title, content) {
        template.then(function (template) {
          $log.info('Opening modal', template);
        
          var scope = $rootScope.$new(true);
          scope.title = title;
          scope.content = content;
          
          scope.$on('$destroy', function () {
            $log.info('Destruction du scope');
          });
          
          template(scope, function (clone) {
            $document.find('body').append(clone);
            
            // A la fermeture du modal, on supprime l'élément et le scope
            clone.on('hidden.bs.modal', function () {
              $log.info('Fermeture du modal', clone);
              
              clone.remove();
              scope.$destroy();
            });

            clone.modal();
          });
        });
      }
    };
  });
