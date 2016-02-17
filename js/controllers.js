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

app.controller('profileCtrl', function($scope, fbAuth, Profile) {
  console.log('profileCtrl');
  
  fbAuth.$onAuth(function(authData) {
      if(authData) {
        $scope.authData = authData;        
        $scope.profileDB =  Profile($scope.authData.uid);
        
        $scope.profileDB.$loaded(function(data) {
          $scope.userObj = {};
          $scope.userObj.name = data.name;
          $scope.userObj.music = data.music;
          $scope.userObj.hobbies = data.hobbies;
        });
      }      
  });

  $scope.saveProfile = function() { 

    fbAuth.$onAuth(function(authData) {
      $scope.authData = authData;
      $scope.profileDB =  Profile($scope.authData.uid);

      $scope.profileDB.name = $scope.userObj.name;
      $scope.profileDB.music = $scope.userObj.music;
      $scope.profileDB.hobbies = $scope.userObj.hobbies;

      console.log('scope.profileDB is: ', $scope.profileDB);
      $scope.profileDB.$save();
    });
  };
});

app.controller('chatsCtrl', function($scope, $state, Auth, List, fbAuth) {
  
  $scope.list = List;

  $scope.postChat = function() {    
    console.log('inside post chat');
    fbAuth.$onAuth(function(authData) {
      $scope.authData = authData;
      var d = new Date();
      var day = d.getDate();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      var timeStamp = month + '/' + day +'/' + year; 
      
      if(authData) {
         var chatMessageObject = {
          userId:$scope.authData.uid,
           email:$scope.authData.password.email,
         message:$scope.chatMessage,
       timeStamp:timeStamp
        };
        
        $scope.list.$add(chatMessageObject);
      }
    });
  };
});

app.controller('navCtrl', function($scope, $state, Auth, fbAuth) {
  fbAuth.$onAuth(function(authData) {
    console.log('authData:', authData);
    $scope.authData = authData;
  });

  $scope.logout = function() {
    Auth.logout();
    $state.go('home');
  };
});

app.controller('userCtrl', function($scope, $state, Auth, Profile, fbAuth, User) {
  $scope.state = $state.current.name.split('.')[1];

  $scope.submit = function() {
    if ($scope.state === 'login') {
      Auth.login($scope.user)
      .then(function() {
        $state.go('home');
      }, function() {
        $scope.user.password = '';
        alert('Invalid email or password.');
      });
    } else {
      if($scope.user.password !== $scope.user.password2) {
        $scope.user.password = $scope.user.password2 = '';
        return alert('Passwords must match');
      }

      Auth.register({
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then(function(authData) {
        console.log('authData:', authData);
        $state.go('home');
      }, function(err) {
        alert('error in console');
        console.error(err);
      });
    }
  };
});


