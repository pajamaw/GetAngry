app.component('specificRep', {
  templateUrl: 'components/specificRepComponent.html',
  bindings:{
    rep: '<',
    office: '<'
  },
  controller: function($element, $compile, RepFinanceService, RepFtmIdService){
    var $ctrlRep = this;
    this.candidateArray = RepFtmIdService.get({state: 'ny', year: '2016', office: 'U'})
    this.candidateArray.$promise.then(function(res){
      var cId = res.records[0].Candidate.id
      RepFinanceService.get({id: cId}).$promise.then(function(finance){
        $ctrlRep.finance = finance.records
        console.log($ctrlRep.finance)
      })
    })
    console.log($ctrlRep.finance)
  }
});
