var http = require('http');
//var url = require('url');

var port = 3000;

var ip = "127.0.0.1";

var messages = [];

var server = http.createServer(function(request, response) {
	if(request.method === "GET") {
		if(request.url === "/") {
			response.writeHead(200);
			response.end(JSON.stringify(messages));
		}
		response.end('hello');
	}
	if(request.method === "POST") {
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

console.log("Listening on http://" + ip + ":" + port);

server.listen(port, ip);
