app.component('repsCom', {
  bindings: {
    repsc: '<'
  },
  templateUrl: 'components/repsComponent.html',
  controller: function ($rootScope, $timeout) {
    this.transferSpecificRepData = function(rep, office){
      console.log(rep)
      console.log(office)
      $rootScope.$emit('getSpecificRepData', rep)
      $rootScope.$emit('getSpecificOfficeData', office)
      console.log('timetouts set')
    }
  }
});
