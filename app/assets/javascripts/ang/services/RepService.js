app.factory("Rep", function($resource, CivicEnv) {
  var env = CivicEnv.getMySecretEnv();
  return $resource(`https://www.googleapis.com/civicinfo/v2/representatives?address=:state&includeOffices=true&fields=divisions%2Ckind%2CnormalizedInput%2Coffices%2Cofficials&key=${env}`, {state: `@state`});
});//default state is NY
