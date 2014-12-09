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
        scope.isLoggedIn = attrs.isLoggedIn;
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
          var oldVoted = scope.review.voted;
          var oldMyVote = scope.review.myVote;
          ReviewServ.addVote({id: scope.review._id}, reviewVote).$promise.then(function(review) {
            if (uservote === 1 || uservote === 2) {
              scope.voted = true;
              review.voted = true;
              review.myVote = uservote;
            } else {
              review.voted = oldVoted;
              review.abusedByMe = true;
              review.myVote = oldMyVote;
            }
            scope.review = review;
            $rootScope.$broadcast('review.vote', review);
          });
        };
      }
    };
  }]);