'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('LoginCtrl', function ($scope , $http, $rootScope, toaster) {



    $scope.login = function(){
          $http.post('/api/login' , $scope.formLogin)
            .success(function(data , headers ){
              if(data.success === true){
                window.localStorage['fd4deef86e4149be2649a12aac29484a'] = data.token;
                 window.localStorage['nombre'] = data.userData.nick;
                window.location.href = "/#/";
                window.location.reload();
               // $scope.message = data;
              }else
                toaster.pop('error', "Error", data);
            })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });
     }
  });
