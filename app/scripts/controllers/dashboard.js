'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('DashboardCtrl', function ($scope, $http) {

    $http.post('/api/users' , {})
        .success(function(data , headers ){
            $scope.message = data;
        })
        .error(function(data){
            $scope.mensaje = "falló la llamada al servidor";
      });

      $scope.delete = function(userId){
        $http.delete('/api/delete_user/' + userId , {})
          .success(function(data ){
              $scope.message = data;
          })
          .error(function(data){
              $scope.mensaje = "falló la llamada al servidor";
            });
      };

      $scope.addAd = function(){
       $http.post('api/sidebar' , $scope.formAd)
          .success(function(data){
              alert(JSON.stringify(data));
           })
           .error(function(data){
            $scope.message = "falló la llamada al servidor";
           });
      };

  });
