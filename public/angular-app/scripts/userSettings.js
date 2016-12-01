/* Resources */
app.factory('User', function($resource) {
  return $resource('/ws/user/:id', {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});

app.factory('Login', function($resource) {
  return $resource('/ws/login', {username: '@username'});
});

/* Controllers */

app.controller('addUser', ['$scope', '$routeParams', 'User' ,function($scope, $routeParams, User) {

  $scope.addUser = function(){
    formData = $scope.formData;

    User.save(formData, function() {
      alert("New user added successfully");
    });
  } 

}]);

app.controller('login', ['$scope', '$routeParams', 'Login' ,function($scope, $routeParams, Login) {

  $scope.loginSubmit = function() {

      var result = Login.query({username: $scope.formData.username}, function(){
          $scope.items = result;
          alert("Login successful!");
      });
  }

}]);






