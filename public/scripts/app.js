"use strict";

angular.module('conFusionApp',['ui.router','ngResource','ngRoute','ngCookies'])

.run(['$rootScope','$state','$location','AuthService',function ($rootScope, $state , $location, AuthService) {
  $rootScope.$on('$stateChangeStart',
    function (event, newState) {
    if (AuthService.isLoggedIn() === false) {
      $location.path('/');
      event.preventDefault();
    }
  });
}])

.config(function ($stateProvider,$urlRouterProvider,$locationProvider) {
  $locationProvider.hashPrefix('');
  $stateProvider

      .state('app',{
          url:'/',
          resolve: {
              "check":function ($location,AuthService) {
                  if(AuthService.isLoggedIn()) {
                    $location.path('/landing');
                  }
              }
          },
          allowAnonymous: false,
          views: {
              'header':{
                  templateUrl:'views/brand.html',
              },
              'content':{
                  templateUrl:'views/login.html',
                  controller:'LoginValidateController'
              },
              /*'footer': {
                templateUrl:'views/student.html'
              }*/
          }
      })

      .state('app.student',{
          url:'landing',
          resolve: {
              "check":function ($location,AuthService) {
                  if(!AuthService.isLoggedIn()) {
                    $location.path('/');
                  }
              }
          },
          views: {
            'header@': {
                templateUrl:'views/blank.html'
            },
              'content@': {
                  templateUrl:'views/student.html',
                  controller:'StudentController'
              }
          }
      })/*
      .state('app.cie2',{
          url:'cie2',
          resolve: {
              "check":function ($location,AuthService) {
                  if(!AuthService.isLoggedIn()) {
                    $location.path('/');
                  }
              }
          },
          views: {
              'header@': {
                  templateUrl:'views/header.html',
                  controller:'StudentController'
              },
              'content@': {
                  templateUrl:'views/cie3.html',
                  controller:'StudentController'
              }
          }
      })
      .state('app.cie3',{
          url:'cie3',
          resolve: {
              "check":function ($location,AuthService) {
                  if(!AuthService.isLoggedIn()) {
                    $location.path('/');
                  }
              }
          },
          views: {
              'header@': {
                  templateUrl:'views/header.html',
                  controller:'StudentController'
              },
              'content@': {
                  templateUrl:'views/cie2.html',
                  controller:'StudentController'
              }
          }
      })*/
      ;
              $urlRouterProvider.otherwise('/landing');
    })

;
