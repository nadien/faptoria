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
    'ngFileUpload',
    'toaster',
    'noCAPTCHA',
    'ui.bootstrap',
    'bw.paging',
    '720kb.socialshare',
    'ngProgress'
  ]);

  app.config([ "$stateProvider", "$locationProvider", "$urlRouterProvider", "$httpProvider", "noCAPTCHAProvider", function ( $stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, noCaptchaProvider) {

    noCaptchaProvider.setSiteKey('6LdSECATAAAAAAHr8wh0VEJP3K2S9zZfDPs5Nw4j');
    noCaptchaProvider.setTheme('dark');
//    $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true).hashPrefix('!');

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
        templateUrl : '/views/sidebar.html',
        controller : 'sidebarCtrl'
      }
     }
   })

    .state('/page' , {
      url : '/page/:id' ,
      views : {
        'header1' : {
          templateUrl : '/views/header.html'
      },
      'contenido' : {
        templateUrl : '/views/home.html',
        controller : 'homeController'
      },
      'sidebar' : {
        templateUrl : '/views/sidebar.html',
        controller : 'sidebarCtrl'
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
        templateUrl : '/views/sidebar.html',
        controller : 'sidebarCtrl'
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
   .state('admin/:id' , {
     url : '/admin/:id' ,
     views : {
       'headerAdmin' : {
         templateUrl : 'views/admin/header_admin.html'
       },
       'admin' : {
         templateUrl : function(urlName){
           return 'views/admin/' + urlName.id +  '.html'},
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
        templateUrl : 'views/moderar.html',
        controller : 'ModerarCtrl'
      },
      'sidebar' : {
        templateUrl : '/views/sidebar.html',
        controller : 'sidebarCtrl'
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


app.controller('indexController' , function($scope, ngProgressFactory){
   var ngProgress =  ngProgressFactory.createInstance();
   ngProgress.setColor('#0DEEE7');
    ngProgress.start();

    window.onload = function(){
    ngProgress.complete();
    }

});