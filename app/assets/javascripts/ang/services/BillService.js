app.factory('bill', function($resource, BillEnv){
  var theEnv = BillEnv.getMySecretEnv();
  return $resource(`https://api.legiscan.com/?key=${theEnv}&op=getMasterList&state=:state`, {state: `@state`})
});
//###google doesn't have great info on their civics api column
//##going to use legiscan api because it's more up to date an dbetter data

//##curl "https://www.googleapis.com/civicinfo/v2/voterinfo?key=<YOUR_API_KEY>&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000"
//
