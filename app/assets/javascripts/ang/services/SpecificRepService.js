app.factory('specificRepService', function($resource, SpecificRepEnv){
  var theEnv = SpecificRepEnv.getMySecretEnv();
  return $resource(`https://api.legiscan.com/?key=${theEnv}&op=getBill&id=:bill_id`, {bill_id: `@billid`})
});
