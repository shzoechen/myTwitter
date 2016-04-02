
var app = {

	init: function() {

		app.getMessages();

		$('#submit').on('click', function(e) {
			e.preventDefault();
			var value = $('#message').val();
			$('#message').val('');
			console.log(value);
			app.sendMessages(value);
		});

	},

	sendMessages: function(value) {
		console.log('value',value);
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/",
			data: JSON.stringify(value),
			success: function(resp) {
				console.log('resp in sendMessages', resp);
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
				//console.log(resp);
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

	renderHTML: function(posts) {
		console.log("in render html", posts)
		var $html = ""; 
		for(var i = 0; i < posts.length; i++) {	
			$html += '<li><p class="post">' + posts[i].text + ': </p</li>';
		}

		$('#posts').empty();
		$('#posts').append($html);
	}
};

app.init();
