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

    $http.post('/api/getArticles' , {})
       .success(function(data){
           $scope.articles = data;
        })
       .error(function(data){
            $scope.message = data;
      });

    $http.post('/api/getAds' , {})
        .success(function(data , headers ){
          if(data[0].title == "mobile"){
                  $scope.adMobil = data[0].content;
          }
           else if(data[1].title == "mobile"){
                  $scope.adMobil = data[1].content;
           }
           else if(data[2].title == "mobile"){
                  $scope.adMobil = data[2].content;
           }

          if(data[0].title == "web"){
                  $scope.adWeb = data[0].content;
          }
          else if(data[1].title == "web"){
                  $scope.adWeb = data[1].content;
          }
          else if(data[2].title == "web"){
                  $scope.adWeb == data[2].content;
          }

          if(data[0].title == "head"){
                  $scope.adHead = data[0].content;
           }
          else if(data[1].title == "head"){
                  $scope.adHead = data[1].content;
          }
          else if(data[2].title == "head"){
                  $scope.adHead = data[2].content;
          }
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

      $scope.addSidebar = function(cont){
       $http.post('api/sidebar' , {title : "sidebar" , content : cont})
          .success(function(data){
              toaster.pop('note', "Éxito", data.message);
           })
           .error(function(data){
            $scope.message = "falló la llamada al servidor";
           });
      };


      $scope.addAdWeb = function(cont){
         $http.post('api/addAd' , { title: "web" , content : cont})
          .success(function(data){
              toaster.pop('note', "Éxito", data.message);
           })
           .error(function(data){
            $scope.message = "falló la llamada al servidor";
           });
      };

      $scope.addAdMob = function(content){
         $http.post('api/addAd' , { title: "mobile" , content : content})
          .success(function(data){
              toaster.pop('note', "Éxito", data.message);
           })
           .error(function(data){
            $scope.message = "falló la llamada al servidor";
           });
      };


      $scope.addHead = function(cont){
       $http.post('api/addAd' , {title : "head" , content : cont})
          .success(function(data){
              toaster.pop('note', "Éxito", data.message);
           })
           .error(function(data){
            $scope.message = "falló la llamada al servidor";
           });
      };


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