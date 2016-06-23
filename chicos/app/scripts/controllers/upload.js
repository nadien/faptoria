'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:SubirCtrl
 * @description
 * # SubirCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('SubirCtrl', function ($scope, $http, Upload) {
    var token = window.localStorage['fd4deef86e4149be2649a12aac29484a'];

if(token){
    $http.post('/api/getRole' , {})
      .success(function(data , headers ){

          
           if(data.success == false){
             $scope.message = "Tienes que registrarte para subir imagen" ;
             $scope.value = false;
          }
          
          if(data.userData)
           if(data.userData._doc.role){
            $scope.value = true;
            $scope.formImg = { BoxId : data.userData._doc._id};
          }
          
      })
      .error(function(data){
          $scope.message = "falló la llamada al servidor";
        });
} else{
    $scope.message = "Tienes que registrarte para subir imagen" ;
    $scope.value = false;
}

  })
