'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:ModerarCtrl
 * @description
 * # ModerarCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('ModerarCtrl', function ($scope , $http) {
    var token =  window.localStorage['fd4deef86e4149be2649a12aac29484a'];

    $http.post('/api/getPhotos' , {})
              .success(function(data , headers ){

                $scope.images = data;

              })
              .error(function(data){
                  $scope.mensaje = "falló la llamada al servidor";
              });

  $http.post('/api/getRole' , {})
              .success(function(data , headers ){

                if(data.userData._doc.role <= 2)
                $scope.value = true;
                else if(data.userData._doc.role >= 3){
                $scope.value = false;
                }
              })
              .error(function(data){
                  $scope.mensaje = "falló la llamada al servidor";
              });

    $scope.eliminar = function(id){
      $http.delete('/api/delete_photo/' + id , {})
      .success(function(data , headers ){
          $scope.message = data;
      })
      .error(function(data){
          $scope.mensaje = "falló la llamada al servidor";
        });
  
    }

  });
