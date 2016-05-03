'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('homeController', function ($scope, $rootScope ,$http, toaster) {
	


  $http.post('/api/getPhotos' , {})
            .success(function(data , headers ){
                  $scope.images = data;
             })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });


   $http.post('/api/getRole' , {})
             .success(function(data , headers ){

               if(data.userData._doc.role <= 2)
                 $scope.value = true;
                   else if(data.userData._doc.role >= 3){
                    $scope.value = false;
                   }
                   })
                   .error(function(data){
                              $scope.mensaje = "falló la llamada al servidor";
                 });

                $scope.delete = function(id){
                  $http.delete('/api/delete_photo/' + id , {})
                  .success(function(data , headers ){
                    
                    if(data.success == true)
                      toaster.pop('note', "Éxito", "Se eliminó la imagen correctamente");
                    else
                      toaster.pop('note', "Falló", "Ya eliminaste la imagen.");

                      $scope.message = data;
                  })
                  .error(function(data){
                      $scope.mensaje = "falló la llamada al servidor";
                    });

                }
     

    $scope.votarPos = function(id, votoNeg, key){
      $scope.disableNeg = {};
      $scope.disablePos = {};
 
      $scope.contadorPos++;
     $http.post('/api/vote/' + id , {votePos : $scope.contadorPos , voteNeg : votoNeg})
         .success(function(data ){
              $scope.message = data;

              if(data.success == false){
                $scope.contadorPos--;
                $scope.disableNeg[key] = true;
                $scope.disablePos[key] = true;
              }
              else if(data.success == true){
              $scope.disableNeg[key] = true;
              $scope.disablePos[key] = true;
              }

             //   displayBlock(id);
                
         })
         .error(function(data){
          if(data.success == false )
            $scope.message = "Necesitas estar registrado para votar";
          else
             $scope.message = "falló la llamada al servidor";
           });
    }

  $scope.votarNeg = function(id , votoPos, key){
    $scope.disableNeg = {};
    $scope.disablePos = {};

   $scope.contadorNeg++;
     $http.post('/api/vote/' + id , {voteNeg : $scope.contadorNeg , votePos : votoPos})
         .success(function(data ){
           
                $scope.message = data;

                 if(data.success == false){
                $scope.contadorNeg--;
                 $scope.disableNeg[key] = true;
                  $scope.disablePos[key] = true;
                }
                else if(data.success == true){
                $scope.disableNeg[key] = true;
                $scope.disablePos[key] = true;
                 }
               
         })
         .error(function(data){
           if(data.success == false )
            $scope.message = "Necesitas estar registrado para votar";
          else
             $scope.message = "falló la llamada al servidor";
           });
  }


  });
