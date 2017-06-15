"use strict";

angular.module('conFusionApp')

.controller('LoginValidateController',['$scope','$location','$http','AuthService',function ($scope,$location,$http,AuthService) {
  $scope.credentials = { username:"",password:"",category:""};
  var channels = [{value:"Student",label:"Student"},{value:"Counsellor",label:"Counsellor"},
                  {value:"Teacher",label:"Teacher"},{value:"Parent",label:"Parent"}];
  $scope.channels = channels;
  $scope.invalidChannelSelection = false;
  $scope.error = false;
  $scope.sendFeedback = function () {
    if($scope.credentials.category===""){
      $scope.invalidChannelSelection = true;
    }
    else {
      $scope.error = false;
      $scope.invalidChannelSelection = false;
      AuthService.login($scope.credentials.username,$scope.credentials.password, $scope.credentials.category)
      .then(function () {
        $scope.isLoggedIn=AuthService.isLoggedIn();
        $scope.userstatus = AuthService.getUserStatus();

          $scope.credentials = { username:"",password:"",category:""};
          $scope.credentials.category = "";
          $scope.form.$setPristine();
          $location.path('/landing');
        })

        .catch(function () {
          $scope.isLoggedIn=AuthService.isLoggedIn();
          $scope.userstatus = AuthService.getUserStatus();
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.form.$setPristine();
        });
    }
  };
}])

.controller('StudentController',['$scope','$location','AuthService','StudentService',function ($scope,$location,AuthService,StudentService) {
    $scope.logout = function () {
      AuthService.logoutuser();
      $location.path('/');
  };


  $scope.showtable = false;
  $scope.data = StudentService.get({sem:4});
  $scope.data.$promise.then(function (data) {
    if(data)
      $scope.showtable=true;
  });
  $scope.currentsemester = 4;
  $scope.semesters = [1,2,3,4,5,6,7,8];
}])
;
