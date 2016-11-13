/*
	This file configures express and applies the waterline orm wrapper found in database.js
*/

var fs          = require('fs');
var request     = require('request');
var http        = require('http');
var https       = require('https');
var express     = require('express');
var bodyParser  = require('body-parser');
var config      = require('config');
var database    = require('database');
var alertmanager= require('alertmanager');

//  Instantiate app
app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  Add Routers
app.get('/', function(req, res, next){
    app.models.alerts.find().exec(function(err, models){
        if(err) return res.json({err:err}, 500);
        res.json(models);
    });
});

app.get('/new-alert', function(req, res, next) {
    var alert_name = req.query.name;
    app.models.alerts.create({'name':alert_name}).exec(function(err, records){
        if(err){
            console.log(err);
        }
        if(records) {
            console.log(records);
        }
    });
});


//  Add Facebook webhook handler
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


////////////
//  Initialize ORM
////////////
database.start();
app.models = database.models;

exports.app = app;


