angular.module('myTweets', [])
.run(function() {
	console.log("hello");
	app.init();
})
.factory('State', function(HttpRequest){
	function init(){
		//getMessages();

		$('#submit').on('click', function(e) {
			e.preventDefault();
			var value = $('#message').val();
			$('#message').val('');
			console.log('value',value);
			sendMessages(value);
		});
	}

	function getMessages(){
		$.ajax({
			url: "http://localhost:3000/",
			type: "GET",
			//contentType: 'application/json',//||||| content error
			success: function(resp) {
				console.log(typeof resp);
				app.addMessage(resp);
			},
			error: function(err) {
				console.log("ajax get failed", err);
			}
		});
	}

	function sendMessages(value) {
		console.log('value in sendMessages',value);
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/",
			data: JSON.stringify(value),
			success: function(resp) {
				console.log('resp in sendMessages', resp)
				//app.getMessages();
			},
			error: function(err) {
				console.log("ajax post failed.", err);
			}
		});
	}

})
.controller('myTweetsCtrl', function($scope) {
	console.log($scope.username);
});

var app = {

	init: function() {

		app.getMessages();

		$('#submit').on('click', function(e) {
			e.preventDefault();
			var value = $('#message').val();
			$('#message').val('');
			console.log(value);
			//app.sendMessages(value);
		});

	},

	sendMessages: function(value) {
		console.log('value',value);
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/",
			data: JSON.stringify(value),
			success: function(resp) {
				app.getMessages();
			},
			error: function(err) {
				console.log("ajax post failed.", err);
			}
		});
	},

	getMessages: function() {
		$.ajax({
			url: "http://localhost:3000/",
			type: "GET",
			//contentType: 'application/json',//||||| content error
			success: function(resp) {
				console.log(typeof resp);
				app.addMessage(resp);
			},
			error: function(err) {
				console.log("ajax get failed", err);
			}
		});
	},

	addMessage: function(messages) {
		//var extra = compareMessages(messages);
		app.renderHTML(messages);
	},

	renderHTML: function(messages) {
		var $html = ""; 
		for(var i = 0; i < messages.length; i++) {	
			$html += '<li><span class="username">' + messages[i].username + ': </span><span class="text">' + messages[i].text + '</span></li>';
		}

		$('#messages').empty();
		$('#messages').append($html);
	}
};

//app.init();
