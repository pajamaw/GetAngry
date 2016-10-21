app.factory("zipServ", function($resource, stateEnv) {
  var envS = stateEnv.getMySecretEnv() || ENV['GOOGLE_MAPS_API_KEY']
  return $resource(`https://maps.googleapis.com/maps/api/geocode/json?address=:zip&key=${envS}`, {zip: `@zip`});
});
//default state is NY
