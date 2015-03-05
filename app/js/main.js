(function () {

    'use strict';

    require('angular');
    require('angular-route');
    require('angular-animate');

    var invitationCtrl = require('./invitation/controllers/invitationctrl');
    var invitationSvc = require('./invitation/services/invitationsvc');
    var rsvpCtrl = require('./rsvp/controllers/rsvpctrl');

    angular.module('InvitifyApp', ['ngRoute', 'ngAnimate'])
        .config([
      '$locationProvider',
      '$routeProvider',
      function ($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');
                // routes
                $routeProvider
                    .when('/', {
                        templateUrl: './js/invitation/invitation.html',
                        controller: 'InvitationController'
                    })
                    .when('/rsvp/:id', {
                        templateUrl: './js/rsvp/rsvp.html',
                        controller: 'RSVPController'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
      }
    ]);

    //Load controller
    angular.module('InvitifyApp')
        .controller('InvitationController', ['$scope', '$routeParams', '$location', 'InvitationSvc', invitationCtrl])
        .service('InvitationSvc', invitationSvc);

    angular.module('InvitifyApp')
        .controller('RSVPController', ['$scope', '$routeParams', 'InvitationSvc', rsvpCtrl])
        .service('InvitationSvc', invitationSvc);

}());