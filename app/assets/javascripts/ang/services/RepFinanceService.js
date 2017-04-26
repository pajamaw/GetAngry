app.factory("RepFinanceService", function($resource, FtmEnv) {
  var env = FtmEnv.getMySecretEnv() || ENV['FTM_API_KEY'];
  return $resource(`http://api.followthemoney.org/?c-t-id=:id&gro=d-cci&APIKey=${env}&mode=json`, {id: `@id`})
})
