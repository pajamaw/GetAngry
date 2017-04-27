app.component('specificRep', {
  templateUrl: 'components/specificRepComponent.html',
  bindings:{
    rep: '<',
    office: '<'
  },
  controller: function($element, $compile, RepFinanceService, RepFtmIdService){
    let $ctrlRep = this;
    this.state = this.office.divisionId.slice(this.office.divisionId.lastIndexOf(':') + 1, this.office.divisionId.length).toLowerCase()
    if (this.office.name.includes('Senate')){
      this.officeAbbreviation = 'U'
      this.yearOptOne = 2016
      this.yearOptTwo = 2012
    }else if (this.office.name.includes('Governor')){
      this.officeAbbreviation = 'G'
      this.yearOptOne = 2016
      this.yearOptTwo = 2012
    } else if (this.office.name.includes('House')){
      //not available at the moment
    }
      this.candidateArray = (y) => RepFtmIdService.get({state: $ctrlRep.state, year: y, office: $ctrlRep.officeAbbreviation})
      this.candidate = (d) => d.records[0].Candidate

    this.candidateArray(this.yearOptOne).$promise.then(function(res){
      console.log(res, 'potential candidates')
      console.log(res.records[0].Candidate, 'first candidate')
      let indexLastName = $ctrlRep.rep.name.toUpperCase().split(' ').length - 1,
          lastName = $ctrlRep.rep.name.toUpperCase().split(' ')[indexLastName]

      if (!$ctrlRep.candidate(res).Candidate.includes(lastName)){
        console.log('trying other term of candidate')
        $ctrlRep.candidateArray($ctrlRep.yearOptTwo).$promise.then(function(resOpt){
          let cId = $ctrlRep.candidate(resOpt).id;

          RepFinanceService.get({id: cId}).$promise.then(function(data){
            $ctrlRep.finance = data.records
            console.log($ctrlRep.finance)
          })
        })
      }else{
        let cId = $ctrlRep.candidate(res).id
        RepFinanceService.get({id: cId}).$promise.then(function(data){
          $ctrlRep.finance = data.records
          console.log($ctrlRep.finance)
        })
      }
    })
  }
});
