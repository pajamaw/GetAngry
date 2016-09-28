app.factory('UserService', function($http){
  this.getUser = function(id){
    return $http.get('/user/' + id);
  };
});
