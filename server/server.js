/*jshint unused: false, node: true */
/*jslint unparam: true, node: true */

var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://heroku_cpslwj5x:osv1hu4kictp62jrnoepc116gh@ds059115.mongolab.com:59115/heroku_cpslwj5x');

var userSchema = new mongoose.Schema({
    _id: String,
    firstname: String,
    lastname: String,
    facebookId: { type: String, required: true, unique: true },
    friendsIds: Array
});

var User = mongoose.model('User', userSchema);

app.set('port', (process.env.PORT || 3000));

app.get('/api/v1/people/:personId', function(request, response, next){

    var personId = request.params.personId;

    User.find({ _id: personId }, function(error, person) {

        if (error) throw error;
        response.json(person);

    });

});

app.get('/api/v1/people', function(request, response, next){

    response.json({"629795542":{"id": "629795542", "firstname":"Giorgio","friendsIds":["703176770","547535464"]}, "703176770":{"firstname":"Mathilde"}, "547535464": {"firstname":"Dries"}});

});

var server = app.listen(app.get('port'), function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('coworker-server listening at http://%s:%s', host, port);

});
