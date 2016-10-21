app.factory('specificBillService', function($resource, BillEnv){
  var theEnv = BillEnv.getMySecretEnv() || ENV['LEGISCAN_API_KEY']
  return $resource(`https://api.legiscan.com/?key=${theEnv}&op=getBill&id=:bill_id`, {bill_id: `@billid`})
});
