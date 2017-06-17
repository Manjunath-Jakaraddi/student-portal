"use strict";

angular.module('conFusionApp')
.constant("BaseUrl","http://localhost:3000/")
.factory('AuthService',['$q','$http','$cookies',
    function ($q,$http,$cookies) {
      var user = null;
      function isLoggedIn () {
          if(user) {
            return true;
          } else {
            user = $cookies.get('x-access-token');
            if(user) {
              $http.defaults.headers.common['x-access-token']=user;
              return true;
            }
            else {
              return false;
            }
          }
        };

      function getUserStatus () {
        return user;
      };

      function logoutuser() {
        user = null;
        $http.defaults.headers.common['x-access-token']="";
        $cookies.remove('x-access-token');
      };

      function login (username,password,category) {
        var deferred = $q.defer();

          // send a post request to the server
          $http.post('/users/login',{username: username, password: password,category: category})
            // handle success
              .success(function (data, status) {
                if(status === 200 && data.status){
                  user = data.token;
                  $cookies.put('x-access-token',user);
                  $http.defaults.headers.common['x-access-token']=data.token;
                  deferred.resolve();
                } else {
                  user = false;
                  deferred.reject();
                }
              })
              // handle error
              .error(function (data) {
                user = false;
                deferred.reject();
              });

          // return promise object
          return deferred.promise;

          };
      return ({
        isLoggedIn:isLoggedIn,
        getUserStatus:getUserStatus,
        login:login,
        logoutuser: logoutuser
      });
    }])



    .service('StudentService',['$resource','BaseUrl',function ($resource,BaseUrl) {
      this.getInfo = function () {
        var data = $resource(BaseUrl+'student/:sem', {sem: '@sem'}, {
        update:{
            method:'PUT'
            }
        });
        return data;
      };
    }])

;
