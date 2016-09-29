app.factory('UserService', function($http, $q, $rootScope){
  var user = null;
  return {
    fetchUser: function(id){
      user = $http.get('/user/' + id);
      return user;
    },
    getUser: function(){
      return user;
    },
    setUser: function(u){
      user = u
    }
  }

});
