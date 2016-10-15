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
    </div>
  `,
  controller: function () {
    this.$onInit = function () {
      this.tab = {
        label: this.label,
        selected: false
      };
      this.tabs.addTab(this.tab);
    };
  }
});
