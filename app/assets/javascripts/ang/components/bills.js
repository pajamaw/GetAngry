app.component('billsField', {
  templateUrl: 'bills.html',
  controller: HomeController,
  bindings: {
    fieldValue: '<',
    fieldType: '@?',
    onUpdate: '&'
  }
});
