app.factory('UserService', function($http, $q, $rootScope){
  this.getUser = function(id){
    return $http.get('/user/' + id);
  };

});
