'use strict';
module.exports = function ($http) {
    this.create = function (invitation) {
        return $http.post('/api/invitations', invitation);
    };
    this.getInvitation = function (invitation) {
        return $http.get('/api/invitations/' + invitation);
    };
    this.vote = function (id, votes) {
        return $http.post('/api/invitations/' + id + '/votes/', votes);
    };
};