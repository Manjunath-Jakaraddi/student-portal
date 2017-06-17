'use strict';

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

  $scope.username = "";
  $scope.currentsemester = 4;
  $scope.showtable = true;
  $scope.data = StudentService.getInfo().query({});
  $scope.data.$promise.then(function (data) {
    if(data) {
      $scope.showtable=true;
      $scope.dispdata = $scope.data[0].Semesters.filter(function (chain) {
        return chain.SemNumber == 4;
      })[0];
      $scope.username = data[0].StudentCredentials.username;
    }
  });
  $scope.semesters = [1,2,3,4,5,6,7,8];
  $scope.changeSem = function (sem) {

    $scope.currentsemester = sem;
    $scope.dispdata = $scope.data[0].Semesters.filter(function (chain) {
      return chain.SemNumber == $scope.currentsemester;
    })[0];
    if($scope.dispdata)
      $scope.showtable=true;
    else {
      $scope.showtable=false;
    }

  };


$scope.tab = 1;
  $scope.select = function (setTab) {
  // if(setTab===2){
  //   $scope.filtText = "appetizer";
  // }
  // else if(setTab===3) {
  //   $scope.filtText = "mains";
  // }
  // else if(setTab===4) {
  //   $scope.filtText = "dessert";
  // }
  // else {
  //   $scope.filtText = "";
  // }
  $scope.tab = setTab;
};
$scope.isSelected = function (checkTab) {
return ($scope.tab===checkTab);
};

}])
;
