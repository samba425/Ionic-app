angular.module('CKC.controllers')

.controller('thanksController', function($scope, $state,$rootScope, $ionicModal,$timeout, $cordovaSQLite, $q, $filter,$window, $location, $ionicPopup, $http,$httpParamSerializerJQLike) {
   
$scope.Main = function() {

    $state.go('Main');
    $window.location.reload(true)
    // $window.location.reload(true)

}
 walkin();
 function walkin() {
      db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);
      var query = "SELECT * FROM walkindata1";
      $cordovaSQLite.execute(db, query).then(function(res) {
        $scope.walkindata = [];
        if (res.rows.length > 0) {
          console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
          for (var i = 0; i < res.rows.length; i++) {

          	  datas = $httpParamSerializerJQLike({
        'customer': res.rows.item(i).customer,
        'phone': res.rows.item(i).phone,
        'email': res.rows.item(i).email,
        'address1': res.rows.item(i).address1,
        'address2': res.rows.item(i).address2,
        'rm': res.rows.item(i).rm,
        'shopname': res.rows.item(i).shopname,
        'shoptype': res.rows.item(i).shoptype,
        'feed': res.rows.item(i).feedback

      });
     
     console.log("data:", datas);
      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      }
     // var d='address1=sgdfgdg&address2=gdfgdf&customer=fsdfsdf&email=sfdsdf@fgsd&feed=%5B%7B%22ques%22:%22Did+one+of+our+supervisors+meet+you+today%3F%22,%22ans%22:%22Yes%22%7D,%7B%22ques%22:%22Did+the+Showroom+Manager%2Fs+meet+you+today%3F%22,%22ans%22:%22No%22%7D,%7B%22ques%22:%22Would+you+recommed+us+to+others%22,%22ans%22:%22Yes%22%7D,%7B%22ques%22:%22How+informative+was+your+Relationship+Manager+today%3F%22,%22ans%22:%22Good%22%7D,%7B%22ques%22:%22Did+you+get+information+on+our+Gold+Standard+1869+Rate+Protection+Plan+(GSTD)%22,%22ans%22:%22No%22%7D,%7B%22ques%22:%22was+the+jewellery+%2F+silverware+of+expected+quality%3F%22,%22ans%22:%22Good%22%7D,%7B%22ques%22:%22Name+of+the+person+who+was+very+helpful+today%3F%22,%22ans%22:%22fdsf%22%7D,%7B%22ques%22:%22Name+of+the+person+who+was+very+helpful+today%3F+Why+do+you+say+so%3F+(Give+your+comments)%22,%22ans%22:%2221431%22%7D%5D&phone=4234.0&rm=gdfg&shopname=The+Touchstone&shoptype='
      
      var url='http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/InsertWalkInData'
      console.log(url);
      $http.post(url, datas, config)
        .success(function(data, status, headers, config) {
         $scope.data = data;
         console.log(datas)
       })

        .error(function(data, status, header, config) {
          console.log("error")
        });  
          }
          console.log("walkindata", datas)

        } else {
          console.log("No results found");
        }
      }, function(err) {
        console.error("error=>" + err);
      });
    }

$cordovaSQLite.execute(db, "DROP TABLE walkindata1");
 

})
