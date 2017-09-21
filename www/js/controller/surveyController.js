angular.module('CKC.controllers')

.controller('surveyController', function($scope, $state, $timeout, $rootScope, $cordovaSQLite, $filter, $window,$http,$q,$httpParamSerializerJQLike) {
    console.log("shopname", $rootScope.duplicate.shopname);
    console.log("type", $rootScope.duplicate.type);

    console.log("$rootScope.optionntypeselect:", $rootScope.optionntypeselect)
    selectAll();

    $scope.radiooptions = [];
    $scope.radioques = [];

    function selectAll() {
        db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
        var query = "SELECT * FROM feeds";
        $cordovaSQLite.execute(db, query).then(function(res) {
            $scope.shopdata = [];
            if (res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.shopdata.push({
                        id: res.rows.item(i).id,
                        questions: res.rows.item(i).questions,
                        shopname: res.rows.item(i).shopname,
                        selectedtype: res.rows.item(i).selectedtype,
                        selection: res.rows.item(i).selection,
                        options: res.rows.item(i).options

                    });
                }
                console.log("dataaaa:", $scope.shopdata);
                 $scope.datafiltered=[];
                angular.forEach($scope.shopdata, function(res)
                {
                    console.log('$rootScope.duplicate.shopname == res.shopname',$rootScope.duplicate.shopname == res.shopname);
                    if($rootScope.duplicate.shopname == res.shopname){
                         $scope.datafiltered.push(res);
                    }
                })
                console.log('$scope.datafiltered.',$scope.datafiltered);
                // $scope.datafiltereds = $filter('filter')($scope.shopdata, { shopname: $rootScope.duplicate.shopname });

                // $scope.datafiltered = $filter('filter')($scope.shopdata, { shopname: $rootScope.duplicate.shopid });
               console.log("id", $scope.datafiltered)
                // console.log('shopname', $scope.datafiltereds)
                $scope.datatype = $filter('filter')($scope.datafiltered, { selectedtype: $rootScope.optionntypeselect });
                $scope.questiontype = $filter('filter')($scope.datatype, { selection: "QuestionType" });
                $scope.radiotype = $filter('filter')($scope.datatype, { selection: "RadioType" });
                angular.forEach($scope.radiotype, function(res, key) {
                    $scope.radiooptions.push(JSON.parse(res.options));
                    $scope.radioques.push(res.questions)
                   
                })
            } else {
                console.log("No results found");
            }
        }, function(err) {
            console.error("error=>" + err);
        });
    }


    $scope.selectAnswers = function(selectedtype) {
        console.log(selectedtype)

    }



    $scope.survey1 = true;
    $scope.survey2 = false;
    $scope.survey3 = false;
    // $scope.survey4 = false;


    $scope.selectedtype = {};


    $scope.limit = 5;


$scope.page1 = function() {
    $scope.surveydat = function(data) {

        $scope.final = JSON.stringify($scope.selectedtype);
    }

    $scope.survey1 = false;
    $scope.survey2 = true;
    $scope.survey3 = false;
    // $scope.survey4 = false;
}


$scope.page2 = function() {
    $scope.final = JSON.stringify($scope.selectedtype);
    $scope.survey1 = false;
    $scope.survey2 = false;
    $scope.survey3 = true;
    // $scope.survey4 = false;
}
$scope.page3 = function() {
   
console.log($rootScope.walkin)
var newkeys = [];
    angular.forEach($scope.selectedtype,function(val,key){
         var feeds={
            ques:key,
            ans:val
        }
newkeys.push(feeds);

    });

    $scope.types = JSON.stringify(newkeys);


    var query = "UPDATE walkindata1 SET feedback = '" + $scope.types + "'  WHERE id ='" + $rootScope.insertId + "'";
    // var query = "UPDATE adminshop1 SET type=" + types[0] + " WHERE shopname =" + shopname;
    $cordovaSQLite.execute(db, query).then(function(res) {
        console.log("insertId: ", res);
        console.log("ok");

    }, function(err) {
        console.error(err);
    });
// var datas = $httpParamSerializerJQLike({
//          'id':$rootScope.lastwalkin,
//         'customer':$rootScope.walkin.customer,
//         'phone':$rootScope.walkin.phone,
//         'email':$rootScope.walkin.email,
//         'address1':$rootScope.walkin.address1,
//         'address2':$rootScope.walkin.address2,
//         'rm':$rootScope.walkin.rm,
//         'shopname':  $rootScope.duplicate.shopname,
//         'shoptype': $scope.optionntypeselect,
//          'feed': $scope.types

//       });
// console.log('datas:',datas)
//       // var data = $.param({
//       //   'shopname': $rootScope.duplicate.shopname,
//       //   'feedback': $scope.types
//       // });

//       // console.log("data:", data)

//       var config = {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
//         }
//       }
//       $http.post('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/UpdateWalkInData', datas, config)
//         .success(function(data, status, headers, config) {
//           $scope.PostDataResponse = data;
//         })
//         .error(function(data, status, header, config) {
//           console.log("error")
//         });


    $scope.survey1 = false;
    $scope.survey2 = false;
    $scope.survey3 = false;
 $state.go('thanks');

}
// $scope.Main = function() {
//     $scope.survey1 = true;
//     $scope.survey2 = false;
//     $scope.survey3 = false;
//     $scope.survey4 = false;
//     $state.go('Main');
//     // $window.location.reload(true)

// }
})



// demo


// angular.module('CKC.controllers')

// .controller('surveyController', function($scope, $state, $timeout) {
//     $scope.survey1 = true;
//     $scope.survey2 = false;
//     $scope.survey3 = false;
//     $scope.survey4 = false;

// $scope.page1 = function() {
//      $scope.survey1 = false;
//     $scope.survey2 = true;
//     $scope.survey3 = false;
//     $scope.survey4 = false;
// }
// $scope.page2 = function() {
//      $scope.survey1 = false;
//     $scope.survey2 = false;
//     $scope.survey3 = true;
//     $scope.survey4 = false;
// }
// $scope.page3 = function() {



//           $scope.survey1 = false;
//     $scope.survey2 = false;
//     $scope.survey3 = false;
//  $scope.survey4 = true;

//        }

//  $scope.Main = function() {
//        $scope.survey1 = true;
//     $scope.survey2 = false;
//     $scope.survey3 = false;
//  $scope.survey4 = false;
//     $state.go('Main');
//  }


// })
