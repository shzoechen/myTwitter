angular.module('myTweets', [])
.run(function(myFactory) {
	console.log("hello");
	var a = "a";
	//myFactory.init();
})
.factory('myFactory', function(){
	function init(){
		$('#submit').on('click', function(e) {
			e.preventDefault();
			var value = $('#message').val();
			$('#message').val('');
			console.log('value',value);
			sendMessages(value);
		});
	}

	function getMessages(){
		console.log('in getMessages')
		$.ajax({
			url: "http://localhost:3000/",
			type: "GET",
			//contentType: 'application/json',//||||| content error
			success: function(resp) {
				console.log('resp in getMessages',resp);
				a = resp;
	     		//$scope.posts = posts;
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
				getMessages();
			},
			error: function(err) {
				console.log("ajax post failed.", err);
			}
		});
	}

	return {
		init: init,
		getMessages: getMessages,
		sendMessages: sendMessages
	};

})
.controller('myTweetsCtrl', function($scope, myFactory) {
	var a;
	$scope.onClick = function() {
		console.log('$scope username', $scope.username);
		myFactory.sendMessages($scope.username).then(function(){
			$scope.posts = a;
			console.log('$scope.post', $scope.posts);

		});
	}

	$scope.getMessages = function(){
		console.log('in getMessages')
		$.ajax({
			url: "http://localhost:3000/",
			type: "GET",
			//contentType: 'application/json',//||||| content error
			success: function(resp) {
				a = resp;
				//console.log('resp in getMessages',$scope.posts);
	     		//$scope.posts = posts;
			},
			error: function(err) {
				console.log("ajax get failed", err);
			}
		});
	}

	//  $scope.getPosts = function() {
	//    myFactory.getMessages()
	//    .then(function(posts){
	//      $scope.posts = posts;
	//      console.log('posts in controller',posts);
	//    });
	//  };

	// $scope.getPosts();	
	//console.log('$scope.posts',$scope.posts)
});

