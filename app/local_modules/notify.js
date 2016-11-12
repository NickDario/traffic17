var request = require('request');
var config = require('config');

function Notify() 
{
    this.target='https://graph.facebook.com/v2.6/me/messages';
    this.token=config.token.oauth;
}

Notify.prototype = new Object();

/**
   Creates the hostname target for a facebook request
**/
Notify.prototype._target = function() {
    path = this.target + '?';
    path += 'access_token='+this.token;
    return path;
}

/**

**/
Notify.prototype.simple = function(userid, message) {
        
    var url = this.target + '?access_token=' + this.token;
    var data = {    
        'recipient': {
            'id': userid,
        },
        'message':{
            'text': message
        }
    };
    
    var got = request.post({url: url,form: data}, function(res){
        console.log('success');
    });
}

exports = module.exports = new Notify();

/*
curl -X POST -H "Content-Type: application/json" -d '{
  "recipient":{
    "id":"1514749848542121"
  },
  "message":{
    "text":"hello, world!"
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=EAAQGr1bgYHcBAFJoqbZCK9kNNqTHfZCKDq6T41V6RlOSWwFpXt7y4FYVG1OiZBpHz7x5PO7XbSJXKZABBVJ1JxwX2IZCouOWvObtHJZCZA7xkoCR3e9FavxWCq3icVfOG5rDe81xcFTjAQ7CJ4c1678TCcmOiSdOlHRzZBId6bQkVgZDZD"
*/



