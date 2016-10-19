app.component('specificRep', {
  templateUrl: 'components/specificRepComponent.html',
  bindings:{
    rep: '<',
    office: '<'
  },
  controller: function(){
    console.log(this.rep)
    console.log(this.office)
  }
});
