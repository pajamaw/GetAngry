app.controller('HomeController', function HomeController($timeout, $scope, $q, Auth, Rep, bills, bill, zipServ){
  var ctrl = this;
  ctrl.reps = {};
  ctrl.bills = bills
  ctrl.zipCode;
  ctrl.state = "NY";
  console.log(bills)
  ctrl.billLimit = 5;
  ctrl.billBeginning = 0;
  $timeout(checkBills, 2000)

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

  ctrl.stateData;
  ctrl.billsData = [];
  var checkFormat = function(zipInput){
    console.log('Am I a number?' + !isNaN(zipInput))
    if(!isNaN(zipInput)){
      //return changeToState(zipInput)
      ctrl.stateData = zipServ.get({zip: zipInput})
      //$timeout(waitForGoogle, 5000)
    //  ctrl.state = ctrl.stateData
      console.log(ctrl.state)
      console.log('cahnge2state')
      console.log(ctrl.state)
    }
    ctrl.state = zipInput
    console.log('not a zipcode')
  }

  var changeToState = function(){
    ctrl.state = ctrl.stateData.results[0].formatted_address.split(",")[1].replace(/[0-9]/g, '').replace(/\s/g, '')
    ///ctrl.zipCode = response.results[0].address_components[4].short_name
    console.log('cahnge2state after waiting')
    console.log(ctrl.state.results[0].formatted_address.split(",")[1].replace(/[0-9]/g, '').replace(/\s/g, ''))
  }

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

  ctrl.resetBillsAndReps = function(sa){
    checkFormat(sa);
    console.log('resetting')
    console.log(sa)

    ctrl.billsData =[]
    ctrl.billBeginning = 0;
    ctrl.billLimit = 5;
    console.log('check' + sa + ctrl.state)
    ctrl.zipCode = sa;
    $timeout(changeToState, 500)
    $timeout(updateInfo, 1000)
  //
  }
    var updateInfo = function(){
      ctrl.reps = Rep.get({state: ctrl.zipCode})
      ctrl.bills = bill.get({state: ctrl.state});
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
