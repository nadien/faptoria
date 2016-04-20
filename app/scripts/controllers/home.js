'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('homeController', function ($scope, $rootScope ,$http) {
	
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
                      $scope.message = data;
                  })
                  .error(function(data){
                      $scope.mensaje = "falló la llamada al servidor";
                    });

                }
                $scope.value = true;
  $scope.votarPos = function(id, pos, neg){
    $scope.votePositive = pos;
    $scope.votePositive+= 1;
    $scope.value = false;
    $http.post('/api/vote/' + id , {votePos : $scope.votePositive , voteNeg : neg})
         .success(function(data ){
              $scope.message = data;
         })
         .error(function(data){
             $scope.mensaje = "falló la llamada al servidor";
           });
      //$scope.image.votes.positives++; 
    }

 $scope.votarNeg = function(id , num){
    $scope.img.votes.negatives++;
    $http.post('/api/vote/' + id , {voteNeg : $scope.img.votes.negatives , votePos : $scope.img.votes.positives})
         .success(function(data ){
              $scope.message = data;
         })
         .error(function(data){
             $scope.mensaje = "falló la llamada al servidor";
           });
      //$scope.image.votes.positives++;
    }

  });
