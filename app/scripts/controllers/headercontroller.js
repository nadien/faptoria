'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:HeadercontrollerCtrl
 * @description
 * # HeadercontrollerCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('HeadercontrollerCtrl', function ($scope, $rootScope, $http) {
  $rootScope.nombres = window.localStorage['nombre'];
      if(window.localStorage['fd4deef86e4149be2649a12aac29484a']){
          $scope.signOrLog = "Perfil"
          $scope.valueShow = true;
        }
      else
          $scope.signOrLog = "Entrar";


    $scope.salir = function(){
      localStorage.clear();
      window.location.href = "/";
      window.location.reload();
    }

   

});
