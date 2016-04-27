'use strict';

/**
 * @ngdoc function
 * @name faptoriaApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the faptoriaApp
 */
angular.module('faptoriaApp')
  .controller('sidebarCtrl', function ($http , $scope) {

  		$http.post('/api/getArticles' , {})
  		.success(function(data){
  			$scope.articles = data;
  		})
  		.error(function(data){
  			$scope.message = data;
  		});
  });