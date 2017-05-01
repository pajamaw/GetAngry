app.controller('NavController', NavController)

function NavController($scope, $state,Auth){
  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;

  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
    $state.go('profile')
  });

  $scope.$on('devise:logout', function(e, user){
    $scope.user = {};
    window.location.href = $state.href('home', {absolute: true});
    window.location.reload();
  });

  $scope.$on('devise:destroy-registration', function(e, user){
    $scope.user = {};
  });
};
