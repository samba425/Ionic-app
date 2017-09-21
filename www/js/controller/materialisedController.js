
angular.module('CKC.controllers')


.controller('materialisedController', function($scope,$state,$ionicModal,$cordovaSQLite,$rootScope,$ionicPopup) {
$scope.material = material;


$scope.materialFormdata = [];
 function material(data){
  $scope.materialFormdata= data;
}


$scope.materialformpopup = function(materialFormdata){
  console.log("materialdata:", materialFormdata)
              console.log('inside dta:', $scope.shopname);
            console.log('inside dta:', $scope.optionntypeselect);
 // console.log("Data:",customerid,name,number,email,address1,address2,rm)
   var query = "INSERT INTO materialform (customerid,name,number,email,address1,address2,rm,shopname,shopType,feedback) VALUES (?,?,?,?,?,?,?,?,?,?)";
    $cordovaSQLite.execute(db, query, [materialFormdata.customerid,materialFormdata.name,materialFormdata.number,materialFormdata.email,materialFormdata.address1,materialFormdata.address2,materialFormdata.rm,$scope.shopname,$scope.optionntypeselect,'']).then(function(res) {
      console.log("insertId:" + res.insertId);
       $rootScope.materialinsertId = res.insertId;
      console.log("ok")
    }, function (err) {
      console.error(err);
    });
}

$scope.materialisedpopupform =  function(data) {

   if (data.customerid == null || data.customerid == "" || data.name == null || data.name == "" || data.number == null || data.number == "" ||data.address1 == null || data.address1 == "" || data.rm == null || data.rm == "") {
           var alertPopup = $ionicPopup.alert({
          title: 'Enter materialised Details',
          template: 'Please Fill All Fields'
        });
        alertPopup.then(function(res) {});
      } else {
        $ionicModal.fromTemplateUrl('materialpopupForm.html', {
            scope: $scope,
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

        }



 $scope.data = {};

$scope.materialised = function(data) {
console.log("materuialform:", data);
 $scope.data = {};
	}


 $scope.shows = false; 
  $scope.showss = true; 
$scope.continue = function() {
    $scope.modal.hide();
     $scope.shows = true;
      $scope.showss = false; 

}
$scope.optionspage = function() {
  $scope.modal.hide();
    $state.go('materialForm');
}

$scope.materialsurvey = function() { 
     $scope.shows = false;
      $scope.showss = true; 
$state.go('materialSurvey');
}
})



// demo


// angular.module('CKC.controllers')
// .controller('materialisedController', function($scope,$state,$ionicModal) {
 

//       $scope.materialisedpopupform =  function() {
//             console.log("asjankj");
//             $ionicModal.fromTemplateUrl('materialpopupForm.html', {
//                 scope: $scope,
//             }).then(function(modal) {
//                 $scope.modal = modal;
//                 $scope.modal.show();
//             });
//         }



//  $scope.data = {};

//   $scope.materialised = function(data) {
// console.log("materuialform:", data);
//  $scope.data = {};
//   }


//  $scope.shows = false; 
//   $scope.showss = true; 
// $scope.continue = function() {
//     $scope.modal.hide();
//      $scope.shows = true;
//       $scope.showss = false; 

// }



// $scope.materialsurvey = function() {
    
//      $scope.shows = false;
//       $scope.showss = true; 
// $state.go('survey');
// }


// })