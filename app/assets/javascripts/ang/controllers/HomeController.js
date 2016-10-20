app.controller('HomeController', function HomeController($timeout, $scope, $q, Auth, Rep, bills, bill, zipServ, $rootScope){
  var ctrl = this;
  ctrl.reps = {};
  //ctrl.bills = bills
  ctrl.zipCode;
  ctrl.state='co'; ///fill in with a state for testing

  console.log(bills)

  ctrl.billLimit = 15;
  ctrl.billBeginning = 0;
  ctrl.stateData;
  ctrl.billsData = [];
  ctrl.specificRep;
  ctrl.specificOffice;

  ctrl.expand = function() {
    ctrl.billLimit += 10;
    checkBills();
  }

  var waitForBills =  ()=> new Promise((resolve, reject)=> { setTimeout(resolve, 1000)})

  waitForBills().then(function(){

    ctrl.bills = bills;
    console.log('did the promise work')
    return waitForBills();

  }).then(function(){
    console.log('holy shit it did')
    checkBills();
  })
  //doesn't mattter which way honestly
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
    //waitForBills();
    for(var i = ctrl.billBeginning; i < ctrl.billLimit; i++){
      ctrl.billsData.push(ctrl.bills.masterlist[i])
    }
    console.log(ctrl.billBeginning + 'number')
    ctrl.billBeginning = ctrl.billLimit
    console.log(ctrl.billsData)
  };

//hacky ass way to get it since the promise is being annoying
  //$timeout(checkBills, 2000)

  var checkFormat = function(zipInput){
    console.log(`checkFormat: I a number: ${!isNaN(zipInput)}`)
    if(!isNaN(zipInput)){
      //return changeToState(zipInput)
      ctrl.stateData = zipServ.get({zip: zipInput})
      //$timeout(waitForGoogle, 5000)
    //  ctrl.state = ctrl.stateData
      $timeout(changeToState, 500)

      console.log(`checkFormat: I am a number came back true... checking ctrl.state after the changeToState timeout:${ctrl.state}`)
    }else{
      ctrl.stateData = zipInput;
      console.log('checkFormat: I am a number returned false')
    }
  }

  var changeToState = function(){
    ctrl.state = ctrl.stateData.results[0].formatted_address.split(",")[1].replace(/[0-9]/g, '').replace(/\s/g, '')
    ///ctrl.zipCode = response.results[0].address_components[4].short_name
    console.log(`changeToState:  checking the ctrl.state zipcode change to state: ${ctrl.stateData.results[0].formatted_address.split(',')[1].replace(/[0-9]/g, '').replace(/\s/g, '')}`)
  }

  var updateInfo = function(){
    ctrl.reps = Rep.get({state: ctrl.zipCode})
    ctrl.bills = bill.get({state: ctrl.state});
    $timeout(console.log(`updateInfo: checking ctrl.reps after timeout: ${ctrl.reps}`), 5000)
    $timeout(checkBills, 2000)
    console.log(ctrl.reps)
  }

  ctrl.resetBillsAndReps = function(sa){
    ctrl.zipCode = null;
    ctrl.stateData = null;
    //when this goes to null for a moment that's wher the flicker occurs
    checkFormat(sa);
    console.log('resetBills and Reps: resetting bills and reps')
    console.log(`resetBills and Reps: what value is being passed? ${sa}`)


    ctrl.billsData =[]
    ctrl.billBeginning = 0;
    ctrl.billLimit = 15;
    console.log(`resetBillsandReps: check ctrl.zip and ctrl.state: ${sa} & ${ctrl.state}`)
    ctrl.zipCode = sa;
    $timeout(updateInfo, 1000)
  }

    $rootScope.$on('getSpecificRepData', function(event, data){
      console.log('getSpecificRepData has Fired from specificRep Component')
      console.log(data)
      console.log(this.rep)
      ctrl.specificRep = data

    })
    $rootScope.$on('getSpecificOfficeData', function(event, data){
      console.log('getSpecificRepData has Fired from specificRep Component')
      console.log(data)
      console.log(this.office)
      ctrl.specificOffice = data

    })

});
