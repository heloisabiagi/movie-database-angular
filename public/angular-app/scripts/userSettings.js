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

app.controller('login', ['$rootScope','$scope', '$location', '$routeParams', 'Login' ,function($rootScope, $scope, $location, $routeParams, Login) {

  $scope.loginSubmit = function() {

      var result = Login.query({username: $scope.formData.username, password: $scope.formData.password}, function(){
          if(result.length > 0) {
            $rootScope.isLogged = true;
            $rootScope.loggedUser = result[0];
            
            alert("Login successful!"); 
            $location.path('/');
          }
          
      });
  }

}]);






