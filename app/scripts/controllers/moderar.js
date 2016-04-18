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

    $http.post('/api/getPhotos' , {})
              .success(function(data , headers ){

                $scope.images = data;

              })
              .error(function(data){
                  $scope.mensaje = "falló la llamada al servidor";
              });
              
  });
