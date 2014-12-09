'use strict';

angular.module('zesty')
  .directive('reviewBox', ['ReviewServ', '$rootScope', function (ReviewServ, $rootScope) {
    return {
      templateUrl: 'app/directives/reviewBox/reviewBox.html',
      restrict: 'E',
      scope: {
        review: '='
      },
      link: function (scope, element, attrs) {
        scope.noFooter = attrs.noFooter;
        scope.withProduct = attrs.withProduct;
        scope.isMine = false;
        scope.customerId = attrs.customerId;
        if (attrs.isLoggedIn && scope.review.customerId &&
              scope.review.customerId === attrs.customerId) {
          scope.isMine = true;
        }
        scope.moment = window.moment;

        scope.vote = function(uservote) {
          var reviewVote = {
            customerId: scope.customerId,
            reviewId: scope.review._id,
            vote: uservote
          };
          ReviewServ.addVote({id: scope.review._id}, reviewVote).$promise.then(function(review) {
            scope.voted = true;
            review.voted = true;
            review.myVote = uservote;
            scope.review = review;
            $rootScope.$broadcast('review.vote', review);
          });
        };
      }
    };
  }]);