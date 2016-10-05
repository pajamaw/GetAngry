app.controller('HomeController', function HomeController($timeout, $scope, $q, Auth, Rep, bills, bill){
  var ctrl = this;
  ctrl.reps = {};
  ctrl.bills = bills

  ctrl.state = "NY";
  console.log(bills)
  ctrl.billLimit = 5;
  ctrl.billBeginning = 0;

  ctrl.expand = function() {
    ctrl.billLimit += 10;
    checkBills();
  }


  Auth.currentUser()
    .then(function(user){
      console.log(user)
      ctrl.user = user
      console.log(ctrl.user)
      console.log(ctrl.user.username)
    })
    ///console.log(ctrl.user)

  ///  console.log(ctrl)
  Rep.get(function(data) {
    ctrl.reps = data;
  });

  ctrl.billsData = [];


  var checkBills = function(){
    console.log('anything')
    console.log(ctrl.state)
    for(var i = ctrl.billBeginning;i < ctrl.billLimit; i++){
      ctrl.billsData.push(ctrl.bills.masterlist[i])
    }
    console.log(ctrl.billBeginning + 'number')
    ctrl.billBeginning = ctrl.billLimit
    console.log(ctrl.billsData)
  };
//hacky ass way to get it since the promise is being annoying
  $timeout(checkBills, 2000)

  ctrl.resetBills = function(sa){
    console.log('resetting')
    console.log(sa)
    ctrl.bills;
    ctrl.reps;

    ctrl.billsData =[]
    ctrl.billBeginning = 0;
    ctrl.billLimit = 5;
    ctrl.reps = Rep.get({state: sa})
    ctrl.bills = bill.get({state: sa});
    $timeout(checkBills, 2000)
  }
  //ctrl.bills = bills;

//  ctrl.resolve = {
//  bills: function (BillService) {
//    return BillService.getBills();
//  }
//}

//  ctrl.getBills = function() {
//    BillService.getBills()
//      .then(function(bills) {

//        console.log(bills);
//        ctrl.items = bills;
//      }).then(function(result){
//        console.log(result)
//        ctrl.bills = [];
//        for(var i = 0; i < ctrl.billLimit; i++){
  //        ctrl.bills.push(ctrl.items.masterfield[i])
//        }
  //      console.log(ctrl.bills);
    //  })
  //  };

//  ctrl.getBills();






  //ctrl.bills = bills
//  Bill.get(function(data){
//    console.log(data.masterlist[0])
//    ctrl.bills = data.masterlist
    //ctrl.billsRecent = ctrl.bills
//    ctrl.billLength = ctrl.bills.length;
//  });
  //ctrl.num = {
//    return ctrl.reps.offices.officialIndices[0]
//  }

});
