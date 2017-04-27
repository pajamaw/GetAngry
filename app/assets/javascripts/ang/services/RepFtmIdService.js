app.factory("RepFtmIdService", function($resource, FtmEnv) {
  var env = FtmEnv.getMySecretEnv() || ENV['FTM_API_KEY'];
  return $resource(`http://api.followthemoney.org/?s=:state&y=:year&c-r-ot=:office&c-t-sts=1&gro=d-nme,c-t-id&APIKey=${env}&mode=json`, {state: `@state`, year: `@year`, office: `@office`})
})
