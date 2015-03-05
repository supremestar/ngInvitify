var express = require('express'),
    app = express(),
    port = process.env.port || 4000,
    server = require('http').Server(app).listen(port),
    api = require('./api/server'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    engine = require('ejs-locals'),
    path = require('path');

app.use('/api', api); // we attach our routes under /api
app.use(express.static(path.join(__dirname, 'app')));
console.log('App active on localhost:' + port);