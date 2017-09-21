// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;
angular.module('CKC', ['ionic', 'CKC.controllers', 'CKC.services', 'ngCordova'])

  .run(function($ionicPlatform, $cordovaSQLite,$http) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      if (window) {
         
        db = window.openDatabase("my.db", "1.0", "sqlitedemo", 2000);

      
         // $cordovaSQLite.execute(db, "DROP TABLE walkindata");
        // $cordovaSQLite.execute(db, "DELETE FROM adminshop1");
        $cordovaSQLite.execute(db, "CREATE TABLE  adminshop1 (shopid integer UNIQUE,url varchar(50),shopname varchar(25),Description varchar(50),type varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  admintype (id integer primary key,type varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  materialform (id integer primary key,customerid varchar(25),name varchar(25),number varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shopType varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata1 (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback varchar(50))");
        
        $cordovaSQLite.execute(db, "CREATE TABLE  feeds (id integer primary key,shopname varchar(50),selectedtype varchar(50),questions varchar(50),selection varchar(50),options json)");

      } else {

        $http.get('http://118.67.249.142/CKC_NEW/ckc_app_Service.asmx/GetShopName').then(function(response){
        console.log("response:",response.data);
        angular.forEach(response.data,function(res){
          console.log(res);
          // $scope.result = res;
            var query = "INSERT OR REPLACE INTO adminshop1(shopid,url,shopname,Description,type) VALUES (?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [res.shopid,res.url, res.shopname, res.Description, res.type]).then(function(res) {
             console.log(res);
            }, function(err) {
                console.error(err);
            });
        })           
 });

        db = $cordovaSQLite.openDB({ name: "my.db" });
         $cordovaSQLite.execute(db, "CREATE TABLE  adminshop1 (shopid integer UNIQUE,url varchar(50),shopname varchar(25),Description varchar(50),type varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  admintype (id integer primary key,type varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  materialform (id integer primary key,customerid varchar(25),name varchar(25),number varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shopType varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback varchar(50))");
        $cordovaSQLite.execute(db, "CREATE TABLE  walkindata1 (id integer primary key UNIQUE,customer varchar(25) ,phone varchar(25),email varchar(25),address1 varchar(25),address2 varchar(25),rm varchar(25),shopname varchar(50),shoptype varchar(50),feedback varchar(50))");
        
        $cordovaSQLite.execute(db, "CREATE TABLE  feeds (id integer primary key,shopname varchar(50),selectedtype varchar(50),questions varchar(50),selection varchar(50),options json)");
}



    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('Main', {
        url: '/Main',
        cache: false,
        templateUrl: 'templates/Main.html',
        controller: 'mainController'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController'
      })

      .state('options', {
        url: '/options',
        templateUrl: 'templates/options.html',
        controller: 'optionsController'
      })

      .state('materialSurvey', {
        url: '/materialSurvey',
        templateUrl: 'templates/materialSurvey.html',
        controller: 'materialSurvey'
      })



      .state('admin', {
        url: '/admin',
        templateUrl: 'templates/admin.html',
        controller: 'adminController'
      })

      .state('walkIn', {
        url: '/walkIn',
        templateUrl: 'templates/walkInForm.html',
        controller: 'walkInController'
      })
 .state('thanks', {
        url: '/thanks',
        templateUrl: 'templates/thanks.html',
        controller: 'thanksController'
      })
      .state('materialForm', {
        url: '/materialForm',
        templateUrl: 'templates/materialised.html',
        controller: 'materialisedController'
      })

      .state('survey', {
        url: '/survey',
        templateUrl: 'templates/survey.html',
        controller: 'surveyController'
      })

    //   .state('tab', {
    //   url: '/tab',
    //   abstract: true,
    //   templateUrl: 'templates/tabs.html'
    // })

    // // Each tab has its own nav history stack:

    // .state('tab.dash', {
    //   url: '/dash',
    //   views: {
    //     'tab-dash': {
    //       templateUrl: 'templates/tab-dash.html',
    //       controller: 'DashCtrl'
    //     }
    //   }
    // })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/Main');

  });
