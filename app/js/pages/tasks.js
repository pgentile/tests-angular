'use strict';


angular.module('testsTasks', ['ngResource'])
  .config(function ($httpProvider) {
    $httpProvider.defaults.headers.common.Authorization = 'Basic YWRtaW46cGFzc3dvcmQ=';
    
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
    
  })
  .config(function ($routeProvider) {
    $routeProvider.when('/tasks/:id', {
      templateUrl: 'pages/task.html',
      controller: 'OneTaskController'
    });
  })
  .constant('taskBaseURL', 'http://localhost:8080')
  .controller('TasksController', function ($scope, $resource, taskBaseURL) {
    
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
    
    loadTasks();
    
  })
  .controller('OneTaskController', function ($scope, $resource, $routeParams, taskBaseURL) {
    
    var Task = $resource(taskBaseURL + '/tasks/:id', { id: '@id' });
    Task.get({ id: $routeParams.id }, function (task) {
      $scope.task = task;
    });
    
  });
