'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('homeController', function ($scope, $rootScope ,$http) {
	$http.post('/api/getPhotos' , {})
            .success(function(data , headers ){
              
              $scope.images = data;
               
            })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });
  });
