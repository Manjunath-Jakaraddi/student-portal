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

      .state('app.aboutus',{
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
                  templateUrl:'views/header.html',
                  controller:'StudentController'
              },
              'content@': {
                  templateUrl:'views/student.html',
                  controller:'StudentController'
              }
          }
      })/*
      .state('app.contactus', {
                  url:'contactus',
                  views: {
                      'content@': {
                          templateUrl : 'views/contact.html',
                          controller  : 'ContactController'
                       }
                  }
              })

              // route for the menu page
              .state('app.menu', {
                  url: 'menu',
                  views: {
                      'content@': {
                          templateUrl : 'views/menu.html',
                          controller  : 'MenuController'
                      }
                  }
              })

              // route for the dishdetail page
              .state('app.dishdetails', {
                  url: 'menu/:id',
                  views: {
                      'content@': {
                          templateUrl : 'views/dish.html',
                          controller  : 'DishDetailController'
                     }
                  }
              })*/
              ;
              $urlRouterProvider.otherwise('/landing');
    })

;
