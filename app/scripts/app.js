'use strict';

/**
 * @ngdoc overview
 * @name faptoriaApp
 * @description
 * # faptoriaApp
 *
 * Main module of the application.
 */
var app = angular
  .module('faptoriaApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($routeProvider, $stateProvider, $locationProvider) {

    $routeProvider.otherwise({redirectTo : '/'});
    $locationProvider.html5Mode(true);

    $stateProvider
   .state('/' , {
      url : '/' ,
      views : {
        'header1' : {
          templateUrl : '/views/header.html'
      },
      'contenido' : {
        templateUrl : '/views/home.html',
        controller : 'homeController'
      }
     }
   })
   .state('/admin' , {
     url : '/admin' ,
     views : {
       'admin' : {
         templateUrl : 'views/admin/admin.html'
      }
    }
  })
  .state('/moderar' , {
    url : '/moderar' ,
    views : {
      'header1' : {
        templateUrl : 'views/header.html'
      },
      'contenido' : {
        templateUrl : 'views/moderar.html'
      }
    }
  })
  .state('/subir' , {
    url : '/subir' ,
    views : {
      'header1' : {
        templateUrl : 'views/header.html'
      } ,
      'contenido' : {
        templateUrl : 'views/upload.html',
        controller : 'SubirCtrl'
      }
    }
  })
  .state('/acerca' , {
    url : '/acerca' ,
    views : {
      'header1' : {
        templateUrl : 'views/header.html'
      } ,
      'contenido' : {
        templateUrl : 'views/acerca.html'
      }
    }
  })
  .state('/contacto' , {
    url : '/contacto' ,
    views : {
      'header1' : {
        templateUrl : 'views/header.html'
      } ,
      'contenido' : {
        templateUrl : 'views/contacto.html',
        controller : 'contactoController'
      }
    }
  })
  .state('/Entrar' , {
    url : '/Entrar' ,
    views : {
      'header1' : {
        templateUrl : 'views/header.html'
      } ,
      'contenido' : {
        templateUrl : 'views/login/login.html',
        controller : 'contactoController'
      }
    }
  }).state('/registro' , {
    url : '/registro' ,
    views : {
      'header1' : {
        templateUrl : 'views/header.html'
      } ,
      'contenido' : {
        templateUrl : 'views/login/signup.html',
        controller : 'SignupCtrl'
      }
    }
  });

  });


app.controller('headerController' , function($scope, $http){
  $scope.value = true;
  if(false)
  $scope.signOrLog = "Perfil"
  else
  $scope.signOrLog = "Entrar"
})
