'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('BoardCtrl', function ($http , $scope, toaster) {
  //	var ruta = (window.location.hash).split("/") ;
  var ruta = window.location.href.split('/')[4];
    var token =  window.localStorage['fd4deef86e4149be2649a12aac29484a'];

		$http.post('/api/getPhoto/' + ruta, {})
            .success(function(data , headers ){

              $scope.image = data;

            })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });

    $http.post('/api/getAds' , {})
          .success(function(data , headers ){
                 // $scope.images = data;
                    
                $scope.ads = data;

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
    
      $scope.image.votes.positives++;
     $http.post('/api/vote/' + id , {votePos : $scope.image.votes.positives , voteNeg : $scope.image.votes.negatives})
         .success(function(data ){
              $scope.message = data;


                     if(data.message == "Falló la autenticación de token."){
                        window.localStorage.removeItem('fd4deef86e4149be2649a12aac29484a');
                        window.location.reload();
                     }


               if(data.success == false){
                  $scope.image.votes.positives--;
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
 
   $scope.image.votes.negatives++;
     $http.post('/api/vote/' + id , {voteNeg : $scope.image.votes.negatives , votePos : $scope.image.votes.positives})
         .success(function(data ){
           

                     if(data.message == "Falló la autenticación de token."){
                        window.localStorage.removeItem('fd4deef86e4149be2649a12aac29484a');
                        window.location.reload();
                     }

                $scope.message = data;
                 if(data.success == false){
                 $scope.image.votes.negatives--;
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
        .success(function(data  ){

            if(data.message == "Falló la autenticación de token."){
               window.localStorage.removeItem('fd4deef86e4149be2649a12aac29484a');
               window.location.reload();
            }

          if(data.success == true){
            window.location.href = "/";
          }
            $scope.message = data;
        })
        .error(function(data){
            $scope.mensaje = "falló la llamada al servidor";
          });

      }




  });
