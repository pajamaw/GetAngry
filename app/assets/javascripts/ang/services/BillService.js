app.factory('bill', function($resource, BillEnv){
  var theEnv = BillEnv.getMySecretEnv();
  return $resource(`https://api.legiscan.com/?key=${theEnv}&op=getMasterList&state=:state`, {state: `@state`})
});
//###google doesn't have great info on their civics api column
//##going to use legiscan api because it's more up to date an dbetter data
