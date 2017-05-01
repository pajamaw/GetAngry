app.controller('HomeController', function HomeController($timeout, $scope, $q, Auth, Rep, bills, bill, zipServ, $rootScope){
  let ctrl = this;
  ctrl.reps = {};
  ctrl.zipCode;
  ctrl.state;
  ctrl.billLimit = 15;
  ctrl.billBeginning = 0;
  ctrl.stateData;
  ctrl.billsData = [];
  ctrl.specificRep;
  ctrl.specificOffice;

  ctrl.expand = () => {
    ctrl.billLimit += 10;
    bills.$promise.then((data)=>{
      console.log(data);
      ctrl.bills = data;
      checkBills();
    })
  }
  Auth.currentUser()
    .then((user)=>{
      ctrl.user = user
    })
  Rep.get((data) =>{
    console.log(data)
   ctrl.reps = data;
  });

  let checkBills = ()=>{
    for(let i = ctrl.billBeginning; i < ctrl.billLimit; i++){
      ctrl.billsData.push(ctrl.bills.masterlist[i])
    }
    ctrl.billBeginning = ctrl.billLimit
  };

  let checkFormat = (zipInput, callback) => {
    console.log(`checkFormat: I a number: ${!isNaN(zipInput)}`)
    if(!isNaN(zipInput)){
      let newZip = zipServ.get({zip: zipInput});

      newZip.$promise.then((data)=>{
        console.log(`checkFormat: I am a number came back true... checking ctrl.state after the changeToState timeout:${ctrl.state}`)
        ctrl.stateData = data;
        changeToState();
        ctrl.billsData = [];
        ctrl.billBeginning = 0;
        ctrl.billLimit = 15;
        console.log(`resetBillsandReps: check ctrl.zip and ctrl.state: ${zipInput} & ${ctrl.state}`)
        ctrl.zipCode = zipInput;
        updateInfo();
        callback();
      })

    }else{
      console.log('checkFormat: I am a number returned false')
      ctrl.billsData = [];
      ctrl.billBeginning = 0;
      ctrl.billLimit = 15;
      console.log(`resetBillsandReps: check ctrl.zip and ctrl.state: ${zipInput} & ${ctrl.state}`)
      ctrl.zipCode = zipInput;
      ctrl.stateData = zipInput;
      updateInfo();
    }
  }

  let changeToState = ()=>{
    ctrl.state = ctrl.stateData.results[0].formatted_address.split(",")[1].replace(/[0-9]/g, '').replace(/\s/g, '')
  }

  ctrl.resetBillsAndReps = (sa) => {
    ctrl.zipCode = null;
    ctrl.stateData = null;
    //when this goes to null for a moment that's wher the flicker occurs
    checkFormat(sa, updateInfo)
  }

  let updateInfo =()=>{
    let repsList = Rep.get({state: ctrl.zipCode})
    let billsList = bill.get({state: ctrl.state});
    repsList.$promise.then((data)=>{
      console.log(data)
      ctrl.reps = data;
    })
    billsList.$promise.then((d)=>{
      console.log(d)
      ctrl.bills = d;
      checkBills();
    })
  }

  $rootScope.$on('getSpecificRepData', (event, data)=>{
    console.log('getSpecificRepData has Fired from specificRep Component')
    console.log(data)
    console.log(this.rep)
    ctrl.specificRep = data
  })
  $rootScope.$on('getSpecificOfficeData', (event, data)=>{
    console.log('getSpecificRepData has Fired from specificRep Component')
    console.log(data)
    console.log(this.office)
    ctrl.specificOffice = data
  })
});
