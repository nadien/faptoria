'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:SubirCtrl
 * @description
 * # SubirCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('SubirCtrl', function ($scope, $http) {
    var token = window.localStorage['fd4deef86e4149be2649a12aac29484a'];
    $scope.formImg = { BoxToken : token};

    $scope.upload = function(formImg){
      $http.post('/api/upload', {formImg  })
              .success(function(data) {
                  $scope.formData = {}; // clear the form so our user is ready to enter another
                  $scope.todos = data;
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
    }

    $scope.complete = function(content) {
      $http.post('/api/upload', {} )
              .success(function(data) {
                  $scope.formData = {}; // clear the form so our user is ready to enter another
                  $scope.todos = data;
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
       }

    $scope.onFileSelect = function() {
       //$files: an array of files selected, each file has name, size, and type.

       $http.post('/api/photo', $scope.image , {Headers: {'Content-Type' : 'multipart/form-data'} })
       alert($scope.image)
               .success(function(data) {
                   $scope.formData = {}; // clear the form so our user is ready to enter another
                   $scope.todos = data;
                   console.log(data);
               })
               .error(function(data) {
                   console.log('Error: ' + data);
               });
             }
  })
