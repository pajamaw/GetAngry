app.controller('ProfileController', function ProfileController($scope, $q, Auth){
  var ctrl = this;
  Auth.currentUser()
    .then(function(user){
      console.log(user)
      ctrl.user = user
      console.log(ctrl.user)
      console.log(ctrl.user.username)
    })

});