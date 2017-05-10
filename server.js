var app = require('express')();
var bodyParser  = require('body-parser');
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 8080;

var token = "426871890789240";

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === '11q2wer34r3r3t35t') {
    res.send(req.query['hub.challenge']);
  }else{
    res.send('Error, wrong validation token');
  }
}
  // mailOptions.text = JSON.stringify(req.body)
  //  transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //         return console.log(error);
  //     }
  //     res.sendStatus(200);

  // });
  // res.sendStatus(200);
});

app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log('event :' + text);

    }
  }
  res.sendStatus(200);
});

app.get('/', function (req, res) {
  res.sendStatus(200);
});

app.listen(port, function () {
  console.log('The webhook is running on port ' + port);
});
