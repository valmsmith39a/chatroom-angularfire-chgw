'use strict';

var app = angular.module('fireApp');

app.controller('mainCtrl', function($scope, List, User) {
  $scope.user = User;
  $scope.list = List;

  $scope.add = function(desc) {
    $scope.list.$add({
      desc: desc,
      isComplete: false
    });
    $scope.desc = '';
  };
});

app.controller('userCtrl', function($scope, $state) {
  $scope.state = $state.current.name.split('.')[1];

  console.log('userCtrl');
  console.log('$state.current:', $state.current);

  $scope.submit = function() {
    console.log($scope.user);
  };
});

