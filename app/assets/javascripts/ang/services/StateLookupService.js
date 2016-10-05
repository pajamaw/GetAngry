app.factory("zipServ", function($resource, stateEnv) {
  var envS = stateEnv.getMySecretEnv();
  return $resource(`https://maps.googleapis.com/maps/api/geocode/json?address=:zip&key=${envS}`, {zip: '@zip'});
});
//default state is NY
// $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = key;
