'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('SignupCtrl', function ($scope , $http) {

    $scope.signup = function(){
    $http.post('/api/signup' , $scope.formSignup)
    .success(function(data , headers ){
      $scope.message = data;
    })
    .error(function(data){
      $scope.mensaje = "falló la llamada al servidor";
    });
  }

  });
