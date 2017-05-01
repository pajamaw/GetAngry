var app = angular.module('app', ['ui.router', 'ngResource', 'Devise', 'templates', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/index.html',
      resolve: {
       bill: 'bill',
       bills: function(bill){
          return bill.get();
        }
      },
      controller: 'HomeController as ctrl'
    })
    .state('home.bill', {
      url: '/bill/:billid',
      template:  `<specific-bill bill="$resolve.billData">Loading...</specific-bill>`,
      resolve:{
        specificBillService: 'specificBillService',
        billData: function(specificBillService, $stateParams){
          return specificBillService.get({bill_id: $stateParams.billid})
        }
      }
    })
    .state('home.rep', {
      url: '/rep',
      template: `<specific-rep rep="ctrl.specificRep" office="ctrl.specificOffice">Loading...</specific-rep>`
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
