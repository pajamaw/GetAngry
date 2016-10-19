app.component('specificBill', {
  templateUrl: 'components/specificBillComponent.html',
  bindings: {
    bill: '<'
  },
  controller: function(){
    console.log(this.bill)
    
  }
});
