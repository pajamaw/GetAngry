app.component('tabs', {
  transclude: true,
  controller: function () {
    this.$onInit = function () {
      this.tabs = [];
    };
    this.addTab = function(tab){
      this.tabs.push(tab);
    };
    this.selectTab = function(index){
      for(let i =0; i< this.tabs.length; i++){
        this.tabs[i].selected= false;
      }
      this.tabs[index].selected = true;
    };
  },
  template: `
    <div class="tabs">
      <ul class="tabs__list">
        <li ng-repeat="tab in $ctrl.tabs">
          <a href=""
          ng-bind="tab.label"
          ng-click="$ctrl.selectTab($index)"
          ui-sref="home"></a>
        </li>
      </ul>
      <div class="tabs__content" ng-transclude></div>
    </div>`
});
