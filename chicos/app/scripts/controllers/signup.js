'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('SignupCtrl', function ($scope , $http, toaster) {

    $scope.signup = function(){

  if($scope.gRecaptchaResponse){
          $http.post('/api/signup' , $scope.formSignup)
            .success(function(data , headers ){
                $scope.message = data.message;
                if(data.success == true){
                toaster.pop('note', "Éxito", "Te registraste con éxito.");
                setTimeout(window.location.href = "/#/Entrar", 1000);
              }
            })
            .error(function(data){
                $scope.message = "falló la llamada al servidor";
              });
          }else if(!$scope.gRecaptchaResponse){
            toaster.pop('note', "Error", "Comprueba que no eres un robot.");
          }
     }
  

  });
