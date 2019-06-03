var functions = require('firebase-functions');
var postmark = require("postmark");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(cors({
    origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function(req, res) {
    res.send('200 ok');
})
app.post('/api', function(req, res){
    var to = req.body.to
    var subject = req.body.subject
    var htmlBody = req.body.htmlBody
    
        var client = new postmark.Client("key");
        client.sendEmail({
            "From": "from email",
            "To": to,
            "Subject": subject,
            "HtmlBody": htmlBody
        }).then(function(data) {
            console.log(data);
            res.send(data);
        }).catch(function(error) {
            res.send(error.message);
        })
});

exports.send_mail = functions.https.onRequest(app);