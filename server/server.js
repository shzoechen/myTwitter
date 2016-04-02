var http = require('http');
//var url = require('url');

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
			headers['Content-Type'] = "application/json";
			response.end(JSON.stringify(messages));
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
			console.log(messages);
			response.end(JSON.stringify(messages));
		})
	}
});

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "application/json",
  "access-control-max-age": 10 // Seconds.
};

console.log("Listening on http://" + ip + ":" + port);

server.listen(port);
