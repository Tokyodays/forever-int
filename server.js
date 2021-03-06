
var express = require('express');
var app = express();

var user = process.env.USER;
var pass = process.env.PASS;

app.set('port', process.env.PORT || 3000);

if (user && pass) {
  app.use(express.basicAuth(user, pass));
}

app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/dist'));

app.listen(app.get('port'), function() {
  console.log('Server listening on port %s', app.get('port'));
});

var email   = require("emailjs/email");
var server  = email.server.connect({
   user:    "talkinlaud",
   password:"bjork",
   host:    "smtp.mail.yahoo.co.jp",
   ssl:     true
});


app.get('/send/', function (req, res) {
  // send the message and get a callback with an error or details of the message that was sent
  server.send({
     text:    "i hope this works",
     from:    "talkinlaud@yahoo.co.jp",
     to:      "talkinlaud@yahoo.co.jp",
     subject: "testing emailjs"
  }, function(err, message) {
    // console.log(err || message);
        var body = null;
        if (err) {
          body = err.toString();
        } else {
          body = "email sent.";
        }
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', Buffer.byteLength(body));
        res.end(body);

  });

});
