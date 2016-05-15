
'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('AdminCtrl', function ($scope , $http, $timeout) {

    $http.post('/api/getRole' , {})
      .success(function(data , headers ){
        //  $scope.message = data;
        //  alert(headers)
          if(data.userData._doc.role <= 2)
          window.location.href = "#/admin/dashboard";
        else if(data.userData._doc.role >= 3){
          window.location.href = "#/";
        }
      })
      .error(function(data){
          $scope.mensaje = "falló la llamada al servidor";
        });

  /*
*/
    $scope.loginAdmin = function(userId){
      $http.post('/api/login' , $scope.formLogin)
        .success(function(data , headers ){
          if(data.success === true){
            window.localStorage['fd4deef86e4149be2649a12aac29484a'] = data.token;
            window.localStorage['nombre'] = data.userData.nick;
            window.location.reload();
          
            $scope.message = data;
          }else
            $scope.message = data;
        })
        .error(function(data){
            $scope.mensaje = "falló la llamada al servidor";
          });
    }
  });
