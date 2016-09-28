var app = angular.module('app' ['ui-router', 'ngResource', 'Devise', 'templates'])
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('login',{
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthController',
      onEnter: ['$state', 'Auth', function($state, Auth){
        Auth.currentUser().then(function(){
          $state.go('home');
        })
      }]
    })
    .state('register',{
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthController',
      onEnter: ['$state', 'Auth', function($state, Auth){
        Auth.currentUser().then(function(){
          $state.go('home');
        })
      }]
    });
})
