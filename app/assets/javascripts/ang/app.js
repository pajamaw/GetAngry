var app = angular.module('app', ['ui.router', 'ngResource', 'Devise', 'templates']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/index.html',
      controller: 'HomeController as ctrl'
    })
    .state('login',{
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthController',
      onEnter: ['$state', 'Auth', function($state, Auth){
        Auth.currentUser().then(function(){
          $state.go('profile');
        })
      }]
    })
    .state('register',{
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthController',
      onEnter: ['$state', 'Auth', function($state, Auth){
        Auth.currentUser().then(function(){
          $state.go('profile');
        })
      }]
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'profile/profile.html',
      controller: 'ProfileController as ctrl'
    })
    $urlRouterProvider.otherwise('/')
})
