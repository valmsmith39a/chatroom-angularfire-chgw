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
    $scope.authData = authData;
    $scope.user =  Profile($scope.authData.uid)
    $scope.user.email = authData.password.email;

    $scope.user.$save();
  });
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

        // Get User reference
        // Create user profile in FB

        //var userObject = User;
        //$scope.user = userObject;

        //var userFirebaseId = authData.uid;

        //console.log('this is the user firebase id ', userFirebaseId);

        //var userObject = Profile(userFirebaseId);

        //console.log('This is user object', userObject);


        //$scope.user = User;

        var userFirebaseId = authData.uid;

        console.log('user firebase id is: ', userFirebaseId);

        $scope.user = Profile(userFirebaseId);
        console.log('scope.user is: ', $scope.user);
        $scope.user.$save();

        /*
        $scope.user.$save({
          uid:authData.uid,
        email:authData.password.email
        });
        */











        $state.go('home');
      }, function(err) {
        alert('error in console');
        console.error(err);
      });
    }
  };
});


