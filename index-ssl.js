var fs = require('fs');
var request = require('request');
var http = require('http');
var https = require('https');
var ini = require('ini');
var express = require('express');
var bodyParser = require('body-parser');

//	Retrieve config 
var config = ini.parse(fs.readFileSync(__dirname+'/src/config.ini', 'utf8'));

//	Create App
var app = express();

//	Setup App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function(req, res, next){
	res.writeHead(200);
	res.end('hello world\n');
});
app.post('/webhook', function(req, res, next){
	console.log('start response');
	var data = req.body;
	// Make sure this is a page subscription
	if (data.object == 'page') {
		// Iterate over each entry
		// There may be multiple if batched
		data.entry.forEach(function(pageEntry) {
			var pageID = pageEntry.id;
			var timeOfEvent = pageEntry.time;

			// Iterate over each messaging event
			pageEntry.messaging.forEach(function(messagingEvent) {
				if (messagingEvent.message) {
				  receivedMessage(messagingEvent);
				} else {
				  	console.log("Webhook received unknown messagingEvent: ", messagingEvent);
					console.log('Of type ' + messagingEvent.message);
				}
			});
		});

		// Assume all went well.
		//
		// You must send back a 200, within 20 seconds, to let us know you've 
		// successfully received the callback. Otherwise, the request will time out.
		res.sendStatus(200);
	} else if(req.query['hub.verify_token'] === config.token.appid) {
	        res.end(req.query['hub.challenge']);
	} 
});

function receivedMessage(event) {
console.log('receivedMessage');
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      case 'image':
        sendImageMessage(senderID);
        break;

      case 'button':
        sendButtonMessage(senderID);
        break;

      case 'generic':
        sendGenericMessage(senderID);
        break;

      case 'receipt':
        sendReceiptMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

function sendTextMessage(recipientId, messageText) {
console.log('sendTestMessage');
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
console.log('callSendAPI');
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: config.token.oauth},
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

//	Generate SSL credentials
var privateKey = fs.readFileSync(__dirname+'/cred/'+config.ssl.key, 'utf8')
var certificate = fs.readFileSync(__dirname+'/cred/'+config.ssl.crt, 'utf8');
var authority  = fs.readFileSync(__dirname+'/cred/'+config.ssl.pem, 'utf8');
var credentials = {
	key: privateKey, 
	cert: certificate, 
	ca: authority,
	passphrase: '5unshine'
};


var traffic = require('server');

//	Turn on server
var httpsServer = https.createServer(credentials, traffic.app).listen(config.port.https, function(){
	console.log('listening on *443');
});


