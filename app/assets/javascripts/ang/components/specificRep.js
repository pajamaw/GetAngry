app.component('specificRep', {
  templateUrl: 'components/specificRepComponent.html',
  bindings:{
    rep: '<',
    office: '<'
  },
  controller: function(RepFinanceService, RepFtmIdService){
    console.log(`inside specificRep Component${this.rep}`)
    console.log(this.office)
    var candidateArray = RepFtmIdService.get({state: 'ny', year: '2016', office: 'U'})
    candidateArray.$promise.then(function(res){
      console.log(res)
      var cId = res.records[0].Candidate.id
      console.log(cId)
      RepFinanceService.get({id: cId}).$promise.then(function(finance){
        console.log(finance)
      })
    })
  }
});
