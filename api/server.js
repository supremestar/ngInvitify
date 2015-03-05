var express     = require('express'),
    http        = require('http'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    config      = require('./config')
    invitation  = require('./models/invitation.js'),
    vote        = require('./models/vote.js');

var app = module.exports = express();
app.use(bodyParser.json());

mongoose.connect(config.creds.mongoose_auth);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
 console.log("Db connected")
});

var invitationSchema = new mongoose.Schema({
    title: String,
    choices: [{ id: Number, displayText: String}],
    votes: [{ name: String, choices: []}]
});

var Invitation = mongoose.model('Invitation', invitationSchema)
var ObjectId = mongoose.Types.ObjectId;

app.get('/invitations/:id', function (req, res) {
    var status = 404
    var myId = ObjectId(req.params.id);
    var result = Invitation.findById(myId, function (err, result) {
        result ? res.send(result)
       : res.status(status).send();
    });
});

app.post('/invitations', function (req, res) {
    var tranInvitation = new invitation(req.body);
    var status = 201
    var newInvitation = new Invitation(tranInvitation);
    newInvitation.save(function () {
        res.header('Location', 'http://' + req.headers.host + app.set('basepath') + req.url + '/' + newInvitation.id);
        res.status(status).send({ id: newInvitation.id });
    });
});

app.post('/invitations/:id/votes', function (req, res) {
    var myId = ObjectId(req.params.id);
    var status = 404
    var result = Invitation.findById(myId, function (err, invitation) {
        if (invitation) {
            invitation.votes.push(new vote(req.body));
            invitation.save(function () {
                app.emit('invitationUpdate', invitation);
                res.status(200).send();
            });
        }
        else {
            res.status(status).send();
        }
    });
});
