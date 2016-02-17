'use strict';

var app = angular.module('fireApp', ['firebase', 'ui.router']);

app.constant('fbUrl', 'https://angularfire-test-chg.firebaseio.com/');

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    
    .state('user', { url: '/user', template: '<ui-view/>', abstract: true })
    .state('user.login', { url: '/login', templateUrl: '/html/user.html', controller: 'userCtrl' })
    .state('user.register', { url: '/register', templateUrl: '/html/user.html', controller: 'userCtrl' })
    .state('chats', { url: '/chats', templateUrl: '/html/chats.html', controller: 'chatsCtrl' })
    .state('user.profile', { url: '/profile', templateUrl: '/html/profile.html', controller: 'profileCtrl',
          onEnter: function($state, fbAuth) {
            console.log('getauth:', fbAuth.$getAuth());
            // if(!fbAuth.$getAuth()){
            //   return $state.go('home');
            // }
          }})

  $urlRouterProvider.otherwise('/');
});

app.filter('titlecase', function() {
  return function(value) {
    if(typeof value !== 'string') return value;
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  };
})
