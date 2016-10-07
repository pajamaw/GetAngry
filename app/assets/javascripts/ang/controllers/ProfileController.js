app.controller('ProfileController', function ProfileController($state, $scope, $state,$q, Auth){
  var ctrl = this;

//  if(!ctrl.user){
//    $state.go('home')
//  }
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
