app.component('tab', {
  bindings: {
    label: '@'
  },
  require: {
    tabs: '^^'
  },
  transclude: true,
  template: `
    <div class="tabs__content" ng-if="$ctrl.tab.selected">
      <div ng-transclude></div>
    </div>`,
  controller: function () {
    this.$onInit = function () {
      this.tab = {
        label: this.label,
        selected: false
      };
      if(this.tab.label=== 'reps'){
        this.tab.selected = true;
      }
      ///forcing the reps to be the default tab loaded
      this.tabs.addTab(this.tab);
    };
  }
});
