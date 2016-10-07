app.controller('HomeController', function HomeController($timeout, $scope, $q, Auth, Rep, bills, bill, zipServ){
  var ctrl = this;
  ctrl.reps = {};
  ctrl.bills = bills
  ctrl.zipCode;
  ctrl.state = null;; ///currently like this for testing
  console.log(bills)
  ctrl.billLimit = 5;
  ctrl.billBeginning = 0;
  ctrl.stateData;
  ctrl.billsData = [];

  ctrl.expand = function() {
    ctrl.billLimit += 10;
    checkBills();
  }

  //$timeout(checkBills, 5000)
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

  var checkBills = function(){
    //console.log('checkBills')
    //console.log(ctrl.state)
    for(var i = ctrl.billBeginning;i < ctrl.billLimit; i++){
      ctrl.billsData.push(ctrl.bills.masterlist[i])
    }
    console.log(ctrl.billBeginning + 'number')
    ctrl.billBeginning = ctrl.billLimit
    console.log(ctrl.billsData)
  };

//hacky ass way to get it since the promise is being annoying
  $timeout(checkBills, 2000)

  var checkFormat = function(zipInput){
    console.log('Am I a number?' + !isNaN(zipInput))
    if(!isNaN(zipInput)){
      //return changeToState(zipInput)
      ctrl.stateData = zipServ.get({zip: zipInput})
      //$timeout(waitForGoogle, 5000)
    //  ctrl.state = ctrl.stateData
      $timeout(changeToState, 500)

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

  var updateInfo = function(){
    ctrl.reps = Rep.get({state: ctrl.zipCode})
    ctrl.bills = bill.get({state: ctrl.state});
    $timeout(console.log(ctrl.reps), 5000)
    $timeout(checkBills, 2000)
  }


  ctrl.resetBillsAndReps = function(sa){
    ctrl.zipCode = null;
    ctrl.state = null;
    checkFormat(sa);
    console.log('resetting')
    console.log(sa)


    ctrl.billsData =[]
    ctrl.billBeginning = 0;
    ctrl.billLimit = 5;
    console.log('check ' + sa + ctrl.state)
    ctrl.zipCode = sa;
    $timeout(updateInfo, 1000)
  }


});
