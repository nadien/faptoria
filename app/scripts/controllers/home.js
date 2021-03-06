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
  //var ruta = (window.location.hash).split("/") ;
    var ruta = window.location.href.split('/')[4];
    

    

    //For mobiles
    var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


  $http.post('/api/getPhotos' , {})
            .success(function(data , headers ){
                 // $scope.images = data;
                    
                    $scope.total = data.length;
                    $scope.currentPage = ruta
                    ,$scope.numPerPage = 10
                    ,$scope.maxSize = 10;

              })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });

            if(isMobile){

             $http.post('/api/getAds' , {})
                    .success(function(data , headers ){
                           // $scope.images = data;
                              if(data[0].title == "mobile"){
                               $scope.ads = data[0].content;
                              }
                              else if(data[1].title == "mobile"){
                               $scope.ads = data[1].content;
                              }
                              else if(data[2].title == "mobile"){
                               $scope.ads = data[2].content;
                              }
                        })
                      .error(function(data){
                          $scope.mensaje = "falló la llamada al servidor";
                        });

          }else{

              $http.post('/api/getAds' , {})
                    .success(function(data , headers ){
                           // $scope.images = data;
                              if(data[0].title == "web"){
                               $scope.ads = data[0].content;
                              }
                              else if(data[1].title == "web"){
                               $scope.ads = data[1].content;
                              }
                              else if(data[2].title == "web"){
                               $scope.ads = data[2].content;
                              }
                        })
                      .error(function(data){
                          $scope.mensaje = "falló la llamada al servidor";
                        });

          }


if(ruta == undefined || ruta == null)
  ruta = 1;

 $http.post('/api/getPhotos/page/' + ruta , {})
            .success(function(data , headers ){
                  $scope.images = data;
             })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });
        
    

$scope.DoCtrlPagingAct = function(text, page, pageSize, total) {
        
$('html,body').scrollTop(0);
  $http.post('/api/getPhotos/page/' + page , {})
            .success(function(data , headers ){
                  $scope.images = data;
             })
            .error(function(data){
                $scope.mensaje = "falló la llamada al servidor";
              });
        
    };
              


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