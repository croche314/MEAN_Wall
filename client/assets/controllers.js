//*********** CONTROLLERS ***********
app.controller('LoginController', function($scope, $location, messageFactory) {
	console.log("Found LoginController");
	$scope.currentUser = {};

	$scope.loginUser = function() {
		messageFactory.findUser($scope.user.username, function(response) {
			console.log("response:", response.data.user[0]);
			if(response.data.user.length == 0) { // username not found so create it
				console.log("user not found");
				messageFactory.createUser($scope.user.username, function(response) {
					console.log("new user response:", response.data.user);
					messageFactory.currentUser = response.data.user;
				});
			} else { // username found
				console.log("user found:",response.data.user[0]);
				messageFactory.currentUser = response.data.user[0];
			}
			
			// then redirect to the Wall
			$location.url('/wall');
		});
	}
});

app.controller('WallController', function($scope, $location, messageFactory) {
	console.log("Found WallController");
	$scope.message = {};
	$scope.comment = {};
	$scope.currentUser = messageFactory.currentUser;

	console.log("currentUser:", $scope.currentUser);
	if($scope.currentUser == undefined) {
		$location.url('/login');
	}

	// Create New Message
	$scope.createMessage = function() {
		console.log("messageObj:", $scope.message);
		messageFactory.createMessage($scope.currentUser._id, $scope.message, function(response) {
			console.log(response);
			$scope.message = {};
		})
	}

	// Display All Messages
	messageFactory.getAllMessages(function(response) {
		//console.log("All Messages:",response.data.all_messages);
		messageFactory.all_messages = response.data.all_messages;
		$scope.all_messages = messageFactory.all_messages;
	});

	// Create New Comment
	$scope.createComment = function(message_id) {
		console.log('*********** CONTROLLER ***********');
		console.log("user_id:", $scope.currentUser.id);
		console.log("message_id:",message_id);
		console.log("comment:", $scope.comment.comment_text);
		messageFactory.createComment($scope.currentUser.id, message_id, $scope.comment,function(response) {
			console.log(response.data.message);
		});
		$scope.comment = {};

	}

});

