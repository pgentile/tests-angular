'use strict';


angular.module('testsTasks', ['ngResource', 'angularFileUpload'])
  .config(function ($httpProvider, $rootScope, $q) {
    // TODO Rendre la config de la Basic Auth dynamique
    $httpProvider.defaults.headers.common.Authorization = 'Basic YWRtaW46cGFzc3dvcmQ=';
    
    // Voir http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var generateUUID = function (){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d/16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    
    $httpProvider.interceptors.push(function () {
      return {
        request: function (config) {
          config.headers['X-CorrelationID'] = 'NG-' + generateUUID();
          return config;
        }
      };
    });
    
    $httpProvider.interceptors.push(function () {
      return {
        requestError: function (rejection) {
          $rootScope.$broadcast('exceptionCaught', {
            exception: new Error('Rejection : ' + rejection),
          });
          
          return $q.reject(rejection);
        }
      };
    });
    
  })
  .config(function ($routeProvider) {
    $routeProvider.when('/tasks/:id', {
      templateUrl: 'pages/task.html',
      controller: 'OneTaskController'
    });
  })
  .constant('taskBaseURL', 'http://localhost:8080')
  .controller('TasksController', function ($scope, $resource, $upload, $window, $log, taskBaseURL) {
    
    var Tasks = $resource(taskBaseURL + '/tasks');
    
    var loadTasks = function () {
      Tasks.query(function (tasks) {
        $scope.tasks = tasks;
      });
    };
    
    var CreateTask = $resource(taskBaseURL + '/tasks/create');
    
    $scope.createTask = function () {
      CreateTask.save({
        title: 'Title, from Angular'
      }, function () {
        loadTasks();
      });
    };
    
    $scope.exportTasks = function () {
      var exportURL = taskBaseURL + '/tasks/export';
      $window.location.href = exportURL;
    };
    
    $scope.importTasks = function (file) {
      $log.info('Uploading file' , file);
      
      $upload.upload({
        url: taskBaseURL + '/tasks/import',
        method: 'POST',
        file: file,
        fileFormDataName: 'file'
      });
    };
    
    loadTasks();
    
  })
  .controller('OneTaskController', function ($log, $scope, $http, $resource, $routeParams, taskBaseURL) {
    
    var TaskResource = $resource(taskBaseURL + '/tasks/:id', { id: '@id' }, {
      get: {
        method: 'GET'
      },
      workOn: {
        method: 'PATCH',
        url: taskBaseURL + '/tasks/:id/workflows/workOn'
      },
      reject: {
        method: 'PATCH',
        url: taskBaseURL + '/tasks/:id/workflows/reject'
      },
      close: {
        method: 'PATCH',
        url: taskBaseURL + '/tasks/:id/workflows/close'
      },
      getComments: {
        method: 'GET',
        url: taskBaseURL + '/tasks/:id/comments',
        isArray: true
      },
      addComment: {
        method: 'POST',
        url: taskBaseURL + '/tasks/:id/comments/add',
      }
    });
    
    var loadComments = function() {
      TaskResource.getComments({ id: $routeParams.id }, function (comments) {
        $scope.comments = comments;
      });
    };
    
    var loadTask = function() {
      TaskResource.get({ id: $routeParams.id }, function (task) {
        $scope.task = task;
        
        loadComments();
      });
    };
    
    $scope.workOn = function () {
      TaskResource.workOn({ id: $routeParams.id }, {
        assignee: 'Cooper',
        title: 'Working task : ' + new Date()
      }, function () {
        loadTask();
      });
    };
    
    $scope.close = function () {
      TaskResource.close({ id: $routeParams.id }, {}, function () {
        loadTask();
      });
    };
    
    $scope.reject = function () {
      TaskResource.reject({ id: $routeParams.id }, {}, function () {
        loadTask();
      });
    };
    
    $scope.addComment = function (content) {
      TaskResource.addComment({ id: $routeParams.id }, {
        comment: content
      }, function () {
        loadComments();
      });
    };
    
    loadTask();
    
  });
