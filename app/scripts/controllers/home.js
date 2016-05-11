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
	var token =  window.localStorage['fd4deef86e4149be2649a12aac29484a'];


  $http.post('/api/getPhotos' , {})
            .success(function(data , headers ){
                  $scope.imagesQ = data;
                    

                    $scope.currentPage = 1
                    ,$scope.numPerPage = 10
                    ,$scope.maxSize = 10;


                  $scope.$watch('currentPage + numPerPage', function() {
                  var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                  , end = begin + $scope.numPerPage;
    
                  $scope.images = data.slice(begin, end);

                    });
             })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });



              

  if(token){
       $http.post('/api/getRole' , {})
             .success(function(data , headers ){
             
              if(data.userData){
               if(data.userData._doc.role <= 2)
                 $scope.value = true;
                   else if(data.userData._doc.role >= 3){
                    $scope.value = false;
                   }
                }

                   })
                   .error(function(data){
                              $scope.mensaje = "falló la llamada al servidor";
                 });

      $scope.votarPos = function(id, votoNeg, key){
         $scope.disableNeg = {};
         $scope.disablePos = {};
 
         $scope.contadorPos++;
          $http.post('/api/vote/' + id , {votePos : $scope.contadorPos , voteNeg : votoNeg})
            .success(function(data ){
               
               if(data.message == "Falló la autenticación de token."){
                window.localStorage.removeItem('fd4deef86e4149be2649a12aac29484a');
                window.location.reload();
               }


              if(data.success == false){
                $scope.contadorPos--;
                $scope.disableNeg[key] = true;
                $scope.disablePos[key] = true;
              }
              else if(data.success == true){
              $scope.disableNeg[key] = true;
              $scope.disablePos[key] = true;
              }

                
         })
         .error(function(data){
            localStorage.removeItem('fd4deef86e4149be2649a12aac29484a');
             window.location.href = "/";

       });
    }

      $scope.votarNeg = function(id , votoPos, key){
        $scope.disableNeg = {};
        $scope.disablePos = {};

      $scope.contadorNeg++;
        $http.post('/api/vote/' + id , {voteNeg : $scope.contadorNeg , votePos : votoPos})
          .success(function(data ){
           
                 if(data.message == "Falló la autenticación de token."){
                   window.localStorage.removeItem('fd4deef86e4149be2649a12aac29484a');
                   window.location.reload();
                 }


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
           toaster.pop('error', "Error", "Falló la llamada al servidor");
         });
      }

  }else {
  $scope.votarPos = function(){
    toaster.pop('error', "Error", "Necesitas registrarte para votar");
        $scope.disableButtons = true;
       
  }
  $scope.votarNeg = function(){
    toaster.pop('error', "Error", "Necesitas registrarte para votar");
        $scope.disableButtons = true;
     
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
                      toaster.pop('note', "Éxito", "Se eliminó la imagen correctamente");
                    else
                      toaster.pop('note', "Falló", "Ya eliminaste la imagen.");

                      $scope.message = data;
                  })
                  .error(function(data){
                      $scope.mensaje = "falló la llamada al servidor";
                    });

                }
     
 

  });
