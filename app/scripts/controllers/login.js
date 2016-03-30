'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('LoginCtrl', function ($scope , $http) {
    $scope.login = function(){
          $http.post('/api/login' , $scope.formLogin)
            .success(function(data , headers ){
                $scope.message = data;
            })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });
     }
  });
