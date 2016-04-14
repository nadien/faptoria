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
        //  $scope.message = data;
        //  alert(headers)
          $scope.formImg = { BoxId : data.userData._doc._id};

          if(data.userData._doc.role <= 2);

        else if(data.userData._doc.role >= 3){
          $scope.message = "Tienes que registrarte para subir imagen" ;
        }
      })
      .error(function(data){
          $scope.message = "falló la llamada al servidor";
        });
}

  })
