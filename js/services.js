'use strict';

var app = angular.module('fireApp');

app.factory('fbRef', function($window, fbUrl) {
  return new $window.Firebase(fbUrl);
});

app.factory('List', function(fbRef, $firebaseArray) {
  var listRef = fbRef.child('list');
  return $firebaseArray(listRef);
});

app.factory('User', function(fbRef, $firebaseObject) {
  var userRef = fbRef.child('user');
  return $firebaseObject(userRef);
});

app.factory('Auth', function(fbRef, $firebaseAuth) {
  return $firebaseAuth(fbRef);
});

app.factory('MakeList', function(fbRef, $firebaseArray) {
  return function(child) {
    var listRef = fbRef.child(child);
    return $firebaseArray(listRef);
  };
});

