app.factory('specificBillService', function($resource, BillEnv){
  var theEnv = BillEnv.getMySecretEnv();
  return $resource(`https://api.legiscan.com/?key=${theEnv}&op=getBill&id=:bill_id`, {bill_id: `@billid`})
});
