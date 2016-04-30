'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:ModerarCtrl
 * @description
 * # ModerarCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('ModerarCtrl', function ($scope , $http) {
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
            }
 

    $scope.delete = function(id){
      $http.delete('/api/delete_photo/' + id , {})
      .success(function(data , headers ){
          $scope.message = data;
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
          $scope.message = data;
      })
      .error(function(data){
          $scope.mensaje = "falló la llamada al servidor";
        });

    }


var dayAndMonth = new Date();
    $scope.votarPos = function(id ){
    
    if(window.localStorage.getItem("Voted:"+id) == dayAndMonth.getDate() + "" +  dayAndMonth.getMonth() ){
     $scope.disableNeg = true;
     $scope.disablePos = true;
    }else{
      $scope.images[$scope.random].votes.positives++;
     $http.post('/api/vote/' + id , {votePos : $scope.images[$scope.random].votes.positives , voteNeg : $scope.images[$scope.random].votes.negatives})
         .success(function(data ){
              $scope.message = data;
              $scope.disableNeg = true;
                
                
         })
         .error(function(data){
             $scope.mensaje = "falló la llamada al servidor";
           });
      //$scope.image.votes.positives++;
      }
    }
 $scope.votarNeg = function(id ){
  if(window.localStorage.getItem("Voted:"+id) == dayAndMonth.getDate() + "" +  dayAndMonth.getMonth()){
   $scope.disablePos = true;
   $scope.disableNeg = true;
  }else{
    $scope.images[$scope.random].votes.negatives++;
     $http.post('/api/vote/' + id , {voteNeg : $scope.images[$scope.random].votes.negatives , votePos : $scope.images[$scope.random].votes.positives})
         .success(function(data ){
                $scope.message = data;
               
                $scope.disablePos = true;
         })
         .error(function(data){
             $scope.mensaje = "falló la llamada al servidor";
           });
      //$scope.image.votes.positives++;
      }
  }

//Create elements and instance events
function displayBlock(id){
 
  window.localStorage["Voted:"+id] = dayAndMonth.getDate() + "" +  dayAndMonth.getMonth() ;
 // $scope.disableVote = true;
 // setCookie("cookieVotes","1",1);

  }

  });
