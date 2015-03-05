module.exports = function ($scope, $routeParams, $location, InvitationSvc) {

    'use strict';
    $scope.showInvitation = false;
    //console.log('show Inviation: ' + $scope.showInvitation);
    $scope.rsvpUrl = '';

    $scope.invitation = {
        'title': '',
        'choices': [{
            displayText: '',
            displayTextPlaceHolder: 'Example: Wednesday'
        }]
    };
    //$scope.choices = [{displayText:'', displayTextPlaceHolder:'Example: Wednesday'}];

    $scope.addChoice = function () {
        console.log('adding input..');
        $scope.invitation.choices.push({
            displayText: '',
            displayTextPlaceHolder: 'Example: Wednesday'
        });
    };

    // $scope.save = function() {
    // 		console.log("saving.. title is: " + $scope.invitation.title + ", Choices are: " + $scope.invitation.choices);
    // 		if ($scope.invitation.choices) {
    // 			$http.post('/api/invitations', $scope.invitation)
    // 			.success(function(post) {
    // 				$scope.invitation.title = null;
    // 				$scope.invitation.choices = [{displayText:'', displayTextPlaceHolder:'Example: Wednesday'}];
    // 			});
    // 		}
    // 	};

    $scope.save = function () {
        //console.log("saving.. title is: " + $scope.invitation.title + ", Choices are: " + $scope.invitation.choices);
        if ($scope.invitation.choices) {
            InvitationSvc.create($scope.invitation)
                .success(function (invitation) {
                    $scope.rsvpUrl = window.location.href + 'rsvp/' + invitation.id;
                    console.log($scope.rsvpUrl);
                    $scope.showInvitation = true;
                });
        }
    };

    $scope.removeInput = function (index) {
        $scope.invitation.choices.splice(index, 1);
    };
};