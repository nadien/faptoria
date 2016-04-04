'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('BoardCtrl', function ($http , $scope) {
  	var ruta = (window.location.hash).split("/") ;
  	
		$http.post('/api/getPhoto/' + ruta[2], {})
            .success(function(data , headers ){
              
              $scope.image = data;
               
            })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });

  });
