'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('DashboardCtrl', function ($scope, $http, $rootScope, toaster) {

    $http.post('/api/users' , {})
        .success(function(data , headers ){
            $scope.message = data;
        })
        .error(function(data){
            $scope.mensaje = "falló la llamada al servidor";
      });

      $scope.delete = function(userId){
        $http.delete('/api/delete_user/' + userId , {})
          .success(function(data ){
              $scope.message = data;
          })
          .error(function(data){
              $scope.mensaje = "falló la llamada al servidor";
            });
      };

      $scope.addAd = function(){
       $http.post('api/sidebar' , $scope.formAd)
          .success(function(data){
              toaster.pop('note', "Éxito", "Anuncio agregador correctamente");
           })
           .error(function(data){
            $scope.message = "falló la llamada al servidor";
           });
      };

      var json = {conf :  "", bool : "true,false"};

      $scope.addText = function(text){
        $http.post('/api/config' , {conf :  "topbarText", topText : text})
        .success(function(data){
         toaster.pop('note', "Éxito", "Texto agregador correctamente");
        })
        .error(function(error){

        });
      };


      $scope.activateDonation = function(val){
        $http.post('/api/config' , {conf :  "donate", donate : val})
        .success(function(data){
          toaster.pop('note', "Éxito", "Cambio correcto");
        })
        .error(function(error){
          alert(error);
        });
      }

       $scope.activateHeader = function(header){
        $http.post('/api/config' , {conf :  "topbarBool", bool : header})
        .success(function(data){
          toaster.pop('note', "Éxito", "Cambio correcto");
        })
        .error(function(error){
          alert(error);
        });
      }

       $http.post('/api/configRes', {})
        .success(function(data){
          $scope.datagrama = data;
        })
        .error(function(error){
          $scope.message = error;
        });


      $rootScope.globalShow = false;

      $scope.activateGlobalShow = function(){
          $rootScope.globalShow = true;
      }


  })

  .filter('addWidth' , function(){
    return function(text){
      var msg = text.replace( /(.)(>$)/g , "\"width=100%\"$1" );
    }
  });


//{conf : 'topbarBool,topbarText,donate' , bool : "true,false"} 