'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:ModerarCtrl
 * @description
 * # ModerarCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('ModerarCtrl', function ($scope , $http, toaster) {
    var token =  window.localStorage['fd4deef86e4149be2649a12aac29484a'];

    $scope.show = true;
    $http.post('/api/getPhotosModerate' , {})
              .success(function(data , headers ){
                
                $scope.images = data;
                $scope.random =  Math.floor(Math.random() * $scope.images.length);
                if(data.length == 0 ){
                $scope.show = false;
                $scope.message = "No hay más imágenes por mostrar";
                }
              })
              .error(function(data){
                  $scope.mensaje = "falló la llamada al servidor";
              });
    

      if(token){
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


    $scope.votarPos = function(id ){
    
         $scope.images[$scope.random].votes.positives++;
     $http.post('/api/vote/' + id , {votePos : $scope.images[$scope.random].votes.positives , voteNeg : $scope.images[$scope.random].votes.negatives})
         .success(function(data ){
             

                     if(data.message == "Falló la autenticación de token."){
                        window.localStorage.removeItem('fd4deef86e4149be2649a12aac29484a');
                        window.location.reload();
                     }

               if(data.success == false){
                 $scope.images[$scope.random].votes.positives--;
                  $scope.disableNeg = true;
                  $scope.disablePos = true;
               }
              else if(data.success == true){
                $scope.disableNeg = true;
                $scope.disablePos = true;
              }
                
         })
         .error(function(data){
          if(data.success == false )
            $scope.message = "Necesitas estar registrado para votar";
          else
             $scope.message = "falló la llamada al servidor";
           });
    }


 $scope.votarNeg = function(id ){

     $scope.images[$scope.random].votes.negatives++;
     $http.post('/api/vote/' + id , {voteNeg : $scope.images[$scope.random].votes.negatives , votePos : $scope.images[$scope.random].votes.positives})
         .success(function(data ){
              $scope.message = data;

                     if(data.message == "Falló la autenticación de token."){
                        window.localStorage.removeItem('fd4deef86e4149be2649a12aac29484a');
                        window.location.reload();
                     }

               if(data.success == false){
                 $scope.images[$scope.random].votes.negatives--;
                  $scope.disableNeg = true;
                  $scope.disablePos = true;
               }
              else if(data.success == true){
                $scope.disableNeg = true;
                $scope.disablePos = true;
              }
                
         })
         .error(function(data){
          if(data.success == false )
            $scope.message = "Necesitas estar registrado para votar";
          else
             $scope.message = "falló la llamada al servidor";
           });

  }


            }else {
                $scope.votarPos = function(){
                     toaster.pop('error', "Error", "Necesitas registrarte para votar");
                     $scope.disableNeg = true;
                    $scope.disablePos = true; 
                }
                $scope.votarNeg = function(){
                   toaster.pop('error', "Error", "Necesitas registrarte para votar");
                   $scope.disableNeg = true;
                  $scope.disablePos = true;
                }
            }     

 

    $scope.delete = function(id){
      $http.delete('/api/delete_photo/' + id , {})
      .success(function(data , headers ){


          if(data.message == "Falló la autenticación de token."){
             window.localStorage.removeItem('fd4deef86e4149be2649a12aac29484a');
             window.location.reload();
            }
          
          if(data.success == true)
            window.location.reload();
      })
      .error(function(data){
          $scope.mensaje = "falló la llamada al servidor";
        });

    }

    $scope.approve = function(id){
      $http.post('/api/approve/' + id , {})
      .success(function(data , headers ){
          
         if(data.message == "Falló la autenticación de token."){
           window.localStorage.removeItem('fd4deef86e4149be2649a12aac29484a');
           window.location.reload();
         }

          if(data.success == true)
            window.location.reload();
      })
      .error(function(data){
          $scope.mensaje = "falló la llamada al servidor";
        });

    }


  });
