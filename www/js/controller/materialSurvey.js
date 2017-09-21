angular.module('CKC.controllers')

.controller('materialSurvey', function($scope, $state, $timeout, $rootScope, $cordovaSQLite, $filter,$window) {
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
                $scope.datafiltered = $filter('filter')($scope.shopdata, { shopname: $rootScope.duplicate.shopname });
                $scope.datatype = $filter('filter')($scope.datafiltered, { selectedtype: $rootScope.optionntypeselect });
                $scope.questiontype = $filter('filter')($scope.datatype, { selection: "QuestionType" });
                $scope.radiotype = $filter('filter')($scope.datatype, { selection: "RadioType" });
                angular.forEach($scope.radiotype, function(res, key) {
                    $scope.radiooptions.push(JSON.parse(res.options));
                    $scope.radioques.push(res.questions)
                })

                console.log("datafiltered ", $scope.datafiltered)
                console.log("questiontype ", $scope.questiontype)

                console.log("$scope.radiooptions final", $scope.radiooptions);
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



$scope.selectedtype  = {};

    $scope.page1 = function() {
        $scope.surveydat = function(data) {
      
            $scope.final = JSON.stringify($scope.selectedtype);
        }
        $scope.survey1 = false;
        $scope.survey2 = true;
        $scope.survey3 = false;

    }

    $scope.limit = 2;
    $scope.page2 = function() {
         $scope.final = JSON.stringify($scope.selectedtype);
           $scope.limit += 1;

            // $scope.selectedtype = selectedtype;
           console.log('datafetch2:',$scope.final);
        $scope.survey1 = false;
        $scope.survey2 = false;
        $scope.survey3 = true;
      
    }
    $scope.page3 = function() {

 console.log('datafetch2:',$scope.selectedtype);
var newkeys = [];
    angular.forEach($scope.selectedtype,function(val,key){
        console.log('val ',val);
        console.log('val ',val);
         var feeds={
            ques:key,
            ans:val
        }
newkeys.push(feeds);

    });
    $scope.types = JSON.stringify(newkeys);
                var query = "UPDATE materialform SET feedback = '" + $scope.types + "'  WHERE id ='" +  $rootScope.materialinsertId  + "'";
                // var query = "UPDATE adminshop1 SET type=" + types[0] + " WHERE shopname =" + shopname;
                $cordovaSQLite.execute(db, query).then(function(res) {
                    console.log("insertId: ", res);
                    console.log("ok");
                    
                }, function(err) {
                    console.error(err);
                });
    
        $scope.survey1 = false;
        $scope.survey2 = false;
        $scope.survey3 = false;
      $state.go('thanks');

    }


})
