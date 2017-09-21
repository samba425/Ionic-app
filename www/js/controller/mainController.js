angular.module('CKC.controllers', [])


.controller('mainController', function($scope, $state,$window, $ionicModal, $cordovaSQLite, $rootScope, $timeout, $http,$location) {


  $scope.doRefresh = function() { 

    console.log('Refreshing!');
    $timeout( function() {
     

 $cordovaSQLite.execute(db, "DELETE FROM adminshop1");
 $cordovaSQLite.execute(db, "DELETE FROM feeds");
    console.log('Refreshing!');

  $window.location.reload(true)
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);

    $http.get('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/GetShopName').then(function(response){
        // console.log("response:",response.data);
        angular.forEach(response.data,function(res){
     var query = "INSERT OR REPLACE INTO adminshop1(shopid,url,shopname,Description,type) VALUES (?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [res.shopid,res.url, res.shopname, res.Description, res.type]).then(function(res) {
            }, function(err) {
                console.error(err);
            });
        })           
 });

 $http.get('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/GetFeeds').then(function(response){
        // console.log("response:",response.data);
        angular.forEach(response.data,function(res){
           var query = "INSERT OR REPLACE INTO feeds(id,shopname,selectedtype,questions,selection,options) VALUES (?,?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [res.id,res.shopname, res.selectedtype, res.questions, res.selection,res.options]).then(function(res) {
            }, function(err) {
                console.error(err);
            });
        })           
 });
      
  };



    $scope.selectAll = selectAll;
    $rootScope.shopNameOptions = '';
    selectAll();

    function selectAll() {
        db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
        var query = "SELECT * FROM adminshop1";
        $cordovaSQLite.execute(db, query).then(function(res) {
            $scope.shopdata = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.shopdata.push({
                        shopid: res.rows.item(i).shopid,
                        url: res.rows.item(i).url,
                        shopname: res.rows.item(i).shopname,
                        Description: res.rows.item(i).Description,
                        type: res.rows.item(i).type,
                    });
                }
                // console.log("dataaaa:", $scope.shopdata);
            } else {
                console.log("No results found");
            }
        }, function(err) {
            console.error("error=>" + err);
        });
    }

    $scope.optionsapage = function(data) {
        console.log("data:", data);
        $state.go('options');
        $rootScope.duplicate = data;
        console.log($rootScope.duplicate.shopid);
        $rootScope.questions = data.questions;
        $rootScope.shopname = data.shopname;
        $rootScope.shopNameOptions = data.type;
    }


});
