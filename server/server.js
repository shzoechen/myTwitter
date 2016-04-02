var http = require('http');
var https = require('https');
var Twit = require('twit');

var T = new Twit({
  consumer_key:         'mMUtWkRXLwpzAwsvBtUI52wkW',
  consumer_secret:      'hVEUq2PFA9gmBdqNK4KVqWuDm1Siamt84qRvcREQnl44Smm8cC',
  access_token:         '4851590771-yL5zB9jmou3dNZ21cDZKOg1smg5FeGIHXax6ji7',
  access_token_secret:  '2aMIL0hkPHLxOdx2vnZ74uLXlCZoSKtUZmfXfFNMDyEp9',
});

var posts = [];

var port = 3000;

var ip = "127.0.0.1";

var messages = [{username:"zoe", text: "hello"}, {username:"ani", text: "hi"}, {username:"zoe", text: "ok."}];

var server = http.createServer(function(request, response) {
	response.writeHead(200, headers);

	console.log('request.method:', request.method);

	if(request.method ==="OPTIONS") {
		response.end();
	}

	if(request.method === "GET") {
		if(request.url === "/") {
			//to send messages to client as objects instead of string.
			console.log('posts',posts);
			headers['Content-Type'] = "application/json";
			response.end(JSON.stringify(posts));
		}
	}
	if(request.method === "POST") {
		//headers['Content-Type'] = "application/json";

		var body = "";
		request.on('data', function(chunk) {
			body += chunk;
		});
		request.on('end', function() {
			var message = JSON.parse(body);
			messages.push(message);
			console.log(message);
			sendRequest(message, function(posts){
	    	//console.log('posts in request post',posts);

			response.end(JSON.stringify(posts));
			});
			//response.end(JSON.stringify(messages));
		})
	}
});

var sendRequest = function(message, callback) {
	console.log("in sendRequest;");

	var params = {screen_name: message, count: 25};

	return T.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	  	console.log('length', tweets.length);
	  	for(var i = 0; i < tweets.length; i++) {

	    	posts[i] = {};
	    	posts[i].text = tweets[i].text;
	  	}
	    	console.log('posts',posts);
	    	callback(posts);
	  }
	});



}

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "application/json",
  "access-control-max-age": 10 // Seconds.
};

console.log("Listening on http://" + ip + ":" + port);

server.listen(port);
