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
    'ui.router',
    'ngFileUpload'
  ]);

    app.run(["$rootScope" , function($rootScope ){


    }]);

  app.config([ "$stateProvider", "$locationProvider", "$urlRouterProvider", "$httpProvider", function ( $stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {


    $urlRouterProvider.otherwise("/");
    const token = window.localStorage['fd4deef86e4149be2649a12aac29484a'];
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['x-access-token'] = token;
    $httpProvider.defaults.headers.post['x-access-token'] = token;

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
      },
      'sidebar' : {
        templateUrl : '/views/sidebar.html'
      }
     }
   })
   .state('tablero' , {
      url : '/tablero/:name' ,
      views : {
        'header1' : {
          templateUrl : '/views/header.html'
      },
      'contenido' : {
        templateUrl : '/views/board.html',
        controller : 'BoardCtrl'
      },
      'sidebar' : {
        templateUrl : '/views/sidebar.html'
      }
     }
   })
   .state('admin' , {
     url : '/admin' ,
     views : {
       'admin' : {
         templateUrl : 'views/admin/admin.html',
         controller : 'AdminCtrl'
      }
    }
  })
   .state('admin/dashboard' , {
     url : '/admin/dashboard' ,
     views : {
       'admin' : {
         templateUrl : 'views/admin/dashboard.html',
         controller : 'DashboardCtrl'
      }
    },
    resolve: {
      loginRequired: loginRequired
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
        templateUrl : 'views/about.html'
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
    resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      },
    views : {
      'header1' : {
        templateUrl : 'views/header.html'
      } ,
      'contenido' : {
        templateUrl : 'views/login/login.html',
        controller : 'LoginCtrl'
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

  function skipIfLoggedIn($q , $location) {
      var deferred = $q.defer();
      if (token) {
        $q.reject();
        $location.path('/home');
      //  alert("funca")
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location) {
      var deferred = $q.defer();
      if (token) {
        deferred.resolve();

      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }

}]);
