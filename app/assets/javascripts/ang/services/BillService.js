app.factory('bill', function($resource, BillEnv){
  var theEnv = BillEnv.getMySecretEnv();
  return $resource(`https://api.legiscan.com/?key=` + theEnv + `&op=getMasterList&state=:state`, {state: '@state'})
});
//google doesn't have great info on their civics api column
//going to use legiscan api because it's more up to date an dbetter data

//curl "https://www.googleapis.com/civicinfo/v2/voterinfo?key=<YOUR_API_KEY>&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000"
//


//app.service('BillService', BillService);
//function BillService($http, $q) {

  // will hold backend posts
//  var Bills = undefined;

  // fetch all posts in deferred technique
  //this.getBills = function() {

    // if posts object is not defined then start the new process for fetch it
  //  if (!Bills) {
//
      // create deferred object using $q
  //    var deferred = $q.defer();

      // get posts form backend
//        .then(function(result) {
          // save fetched posts to the local variable
//          Bills = result.data;
          // resolve the deferred
  //        deferred.resolve(Bills);
  //      }, function(error) {
  //        Bills = error;
  //        deferred.reject(error);
//        });

      // set the posts object to be a promise until result comeback
//      Bills = deferred.promise;
//    }

    // in any way wrap the posts object with $q.when which means:
    // local posts object could be:
    // a promise
    // a real posts data
    // both cases will be handled as promise because $q.when on real data will resolve it immediately
//    return $q.when(Bills);
//  };

//}
