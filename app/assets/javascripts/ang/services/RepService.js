app.factory("Rep", function($resource, CivicEnv) {
  var env = CivicEnv.getMySecretEnv();
  return $resource(`https://www.googleapis.com/civicinfo/v2/representatives?address=10007&includeOffices=true&fields=divisions%2Ckind%2CnormalizedInput%2Coffices%2Cofficials&key=${env}`);
});
// $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = key;
