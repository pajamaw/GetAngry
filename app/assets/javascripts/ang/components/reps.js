app.component('repsField', {
  templateUrl: 'reps.html',
  controller: HomeController,
  bindings: {
    fieldValue: '<',
    fieldType: '@?',
    onUpdate: '&'
  }
});
