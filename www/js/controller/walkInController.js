angular.module('CKC.controllers')

.controller('walkInController', function($scope, $state, $ionicModal, $cordovaSQLite, $rootScope,$http,$q,$ionicPopup,$httpParamSerializerJQLike) {


    $scope.walkinformdata = [];


    $scope.formdata = function(data) {
        $scope.walkinformdata = data;
        console.log("data", data)
    }

    $scope.wakinpopup = function(walkinformdata) {
 if ( walkinformdata.customer == null || walkinformdata.customer == "" || walkinformdata.phone == null || walkinformdata.phone == "" || walkinformdata.email == null || walkinformdata.email == "" ||walkinformdata.address1 == null || walkinformdata.address1 == "" || walkinformdata.rm == null || walkinformdata.rm == "") {
           var alertPopup = $ionicPopup.alert({
          title: 'Enter Walkin Details',
          template: 'Please Fill All Fields'
        });
        alertPopup.then(function(res) {});
      } else {
        $ionicModal.fromTemplateUrl('walkinpopupForm.html', {
            scope: $scope,
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }
}
    $scope.walkinFormdata = function(walkinformdata) {
$rootScope.walkin = walkinformdata;

$rootScope.customername = walkinformdata.customer;
console.log($rootScope.customername);
            console.log('inside dta:', $scope.shopname);
            console.log('inside dta:', $scope.optionntypeselect);
            var query = "INSERT INTO walkindata1 (customer,phone,email,address1,address2,rm,shopname,shopType,feedback) VALUES (?,?,?,?,?,?,?,?,?)";
            console.log("query:", query)
            $cordovaSQLite.execute(db, query, [walkinformdata.customer, walkinformdata.phone, walkinformdata.email, walkinformdata.address1, walkinformdata.address2, walkinformdata.rm, $scope.shopname,$scope.optionntypeselect, '']).then(function(res) {
                console.log("insertId: " + res);
                console.log("ok")
                $rootScope.insertId = res.insertId;
                $scope.data = { customer: "", phone: "", email: "", address1: "", address2: "", rm: "" };
            }, function(err) {
                console.error(err);
            });
 //             var datas = $httpParamSerializerJQLike({
 //        'customer': walkinformdata.customer,
 //        'phone': walkinformdata.phone,
 //        'email': walkinformdata.email,
 //        'address1': walkinformdata.address1,
 //        'address2': walkinformdata.address2,
 //        'rm': walkinformdata.rm,
 //        'shopname':  $rootScope.duplicate.shopname,
 //        'shoptype': $scope.optionntypeselect,
 //        'feed': '[]'

 //      });
 //      console.log("data:", datas);
 //      var config = {
 //        headers: {
 //          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
 //        }
 //      }
 //      $http.post('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/InsertWalkInData', datas, config)
 //        .success(function(data, status, headers, config) {
 //         $scope.data = data;
 //         console.log(data)


 //    $http.get('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/GetWalkInData').then(function(response){
 //        console.log("response:",response.data);
 //                var ss= response.data.reverse();
 //                console.log("ss:",ss[0].id)

 //                $rootScope.lastwalkin = ss[0].id;
 // });


 //        })
 //        .error(function(data, status, header, config) {
 //          console.log("error")
 //        });     
    }

    $scope.optionspage = function() {
        $state.go('walkIn');
        $scope.modal.hide();
    }

    $scope.shows = false;
    $scope.showss = true;
    $scope.survey = function() {
        $scope.modal.hide();
        $scope.shows = true;
        $scope.showss = false;
    }

    $scope.proceed = function() {
        $state.go('survey');
        $scope.shows = false;
        $scope.showss = true;

    }
})
