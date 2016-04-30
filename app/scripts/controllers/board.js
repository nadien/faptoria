'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('BoardCtrl', function ($http , $scope) {
  	var ruta = (window.location.hash).split("/") ;
    var token =  window.localStorage['fd4deef86e4149be2649a12aac29484a'];

		$http.post('/api/getPhoto/' + ruta[2], {})
            .success(function(data , headers ){

              $scope.image = data;

            })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });

    $scope.votarPos = function(id ){
    
     $scope.disableNeg = true;
     $scope.disablePos = true;
   
      $scope.image.votes.positives++;
     $http.post('/api/vote/' + id , {votePos : $scope.image.votes.positives , voteNeg : $scope.image.votes.negatives})
         .success(function(data ){
              $scope.message = data;
              $scope.disableNeg = true;
             //   displayBlock(id);
                
         })
         .error(function(data){
          if(data.success == false )
            $scope.message = "Necesitas estar registrado para votar";
          else
             $scope.message = "falló la llamada al servidor";
           });
    }

 $scope.votarNeg = function(id ){
   $scope.disablePos = true;
   $scope.disableNeg = true;

   $scope.image.votes.negatives++;
     $http.post('/api/vote/' + id , {voteNeg : $scope.image.votes.negatives , votePos : $scope.image.votes.positives})
         .success(function(data ){
           
                $scope.message = data;
                $scope.disablePos = true;
         })
         .error(function(data){
           if(data.success == false )
            $scope.message = "Necesitas estar registrado para votar";
          else
             $scope.message = "falló la llamada al servidor";
           });
  }

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
}
      $scope.delete = function(id){
        $http.delete('/api/delete_photo/' + id , {})
        .success(function(data  ){
          if(data.success == true){
            window.location.href = "/";
          }
            $scope.message = data;
        })
        .error(function(data){
            $scope.mensaje = "falló la llamada al servidor";
          });

      }



//Create elements and instance events
function displayBlock(id){
 
  window.localStorage["Voted:"+id] = dayAndMonth.getDate() + "" +  dayAndMonth.getMonth() ;
 // $scope.disableVote = true;
 // setCookie("cookieVotes","1",1);

  }

  });
