'use strict';

/**
 * @ngdoc overview
 * @name faptoriaApp
 * @description
 * # faptoriaApp
 *
 * Main module of the application.
 */
angular
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
  .config(function ($routeProvider, $stateProvider) {

    $stateProvider
    .state('/' , {
      url : '/' ,
      views : {
        'header1' : {
          templateUrl : 'views/header.html'
      },
      'contenido' : {
        templateUrl : 'views/home.html',
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
  });

  /*

      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/moderar', {
        templateUrl: 'views/moderar.html',
        controller: 'ModerarCtrl',
        controllerAs: 'moderar'
      })
      .when('/admin', {
        templateUrl: 'views/admin/admin.html',
        controller: 'ModerarCtrl',
        controllerAs: 'moderar'
      })
       */
  });
