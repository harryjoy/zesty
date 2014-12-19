'use strict';

angular.module('zesty.admin')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

  $scope.users = User.query();

  $scope.delete = function(user) {
    User.remove({ id: user._id });
    angular.forEach($scope.users, function(u, i) {
      if (u === user) {
        $scope.users.splice(i, 1);
      }
    });
  };
});
