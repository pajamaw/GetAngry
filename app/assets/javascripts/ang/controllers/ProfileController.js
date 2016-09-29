app.controller('ProfileController', function ProfileController($scope, $state,$q, Auth){
  var ctrl = this;

  $scope.signedIn = Auth.isAuthenticated

//  if(!ctrl.user){
//    $state.go('home')
  //}

  Auth.currentUser()
    .then(function(user){
      console.log(user)
      ctrl.user = user
      console.log(ctrl.user)
      console.log(ctrl.user.username)
    })

});
