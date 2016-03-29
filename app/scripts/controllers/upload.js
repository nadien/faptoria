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

    $scope.validar = function(){
      $http.post('/upload', $scope.image , {Headers: {'Content-Type' : 'multipart/form-data'} })
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
  });
