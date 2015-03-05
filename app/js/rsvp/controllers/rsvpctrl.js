'use strict';
module.exports = function ($scope, $routeParams, InvitationSvc) {
    $scope.rsvpSubmitted = false;

    var votes = {
        'respondeeName': '',
        'choices': []
    };
    //votesTableData = {'name':'', 'choices': [{'id':'', 'isChosen':false}]}
    $scope.votesTableData = [];
    $scope.invitation = null;

    var id = $routeParams.id;
    var x = {};
    $scope.status = false;

    //console.log('Invitation Id:'  + id);

    $scope.findOne = function () {
        console.log('findOne called');
        InvitationSvc.getInvitation(id)
            .success(function (data) {
                //console.log('invitation: ' + data);
                $scope.invitation = data;
                $scope.votesTableData = [];
                $scope.populateVotesTableData($scope.status);
            });
    };

    $scope.votersName = {};
    $scope.votersChoices = {};
    $scope.tableData = [];
    $scope.dataT = {};

    $scope.populateVotesTableData = function (status) {
        console.log($scope.status);
        if (!$scope.status) {
            angular.forEach($scope.invitation.votes, function (vote) {
                $scope.votersName = vote.name;
                console.log('name: ' + vote.name + 'length: ' + $scope.invitation.votes.length);
                angular.forEach($scope.invitation.choices, function (choice) {
                    console.log('inner loop: ' + choice.id);
                    $scope.votersChoices = {
                        id: choice.id,
                        isChosen: vote.choices.indexOf(choice.id) >= 0
                    };
                    $scope.tableData.push($scope.votersChoices);
                });
                console.log('outside innerloop');
                $scope.dataT = {
                    'name': $scope.votersName,
                    'choice': $scope.tableData
                };
                $scope.votesTableData.push($scope.dataT);
                $scope.tableData = [];
            });
            $scope.status = true;
        }
    };

    $scope.submitRsvp = function () {
        //if ($scope.respondeeName != null && $scope.id.length > 0){
        //InvitationSvc.vote($scope.invitation);
        //};
        var selectedChoice = [];
        angular.forEach($scope.invitation.choices, function (item) {
            if (item.Selected) {
                selectedChoice.push(item.id);
            }
        });

        this.votes = {
            'name': $scope.invitation.votes.respondeeName,
            'choices': selectedChoice
        };
        $scope.invitation.votes = this.votes;

        console.log($scope.invitation.votes);
        InvitationSvc.vote(id, $scope.invitation.votes)
            .success(function (data) {
                $scope.status = false;
                $scope.rsvpSubmitted = true;
                $scope.findOne();
            });
    };
};