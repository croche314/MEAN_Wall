app.factory('messageFactory', function($http) {
	var factory = {};
	factory.all_messages = [];

	factory.index = function(callback) {
		$http.get('/index').then(function(returned_data) {
			console.log("Found some data:,", returned_data);
			callback(returned_data.data);
		});
	}

	factory.findUser = function(username, callback) {
		$http.get('/user/find/'+username).then(function(response) {
			//console.log("findUser response:", response);
			callback(response);
		});
	}

	factory.createUser = function(username, callback) {
		$http.post('/user/new/' + username).then(function(response) {
			callback(response);
		});
	}

	factory.createMessage = function(user_id, messageObj, callback) {
		$http.post('/message/new/' + user_id, messageObj).then(function(response) {
			console.log(response.data.message);
			response.data.newMessage._author_id =  {
				_id: factory.currentUser._id,
				username: factory.currentUser.username
			}
			console.log("newMessage:",response.data.newMessage);
			factory.all_messages.push(response.data.newMessage);
		})
	}

	factory.getAllMessages = function(callback) {
		$http.get('/message/all').then(function(response) {
			callback(response);
		});
	}

	factory.createComment = function(user_id, message_id, commentObj, callback) {
		console.log('*********** FACTORY ***********');
		console.log("user_id:", user_id);
		console.log("message_id:",message_id);
		console.log("commentObj:", commentObj);
		$http.post('/comment/new/'+user_id+'/'+message_id, commentObj).then(function(response) {
			console.log(response.data.message);
			response.data.comment._author_id =  {
				_id: factory.currentUser._id,
				username: factory.currentUser.username
			}
			for(var i=0; i<factory.all_messages.length;i++) {
				console.log('*****' + factory.all_messages[i].text + '*****');
				if(factory.all_messages[i]._id == message_id) {
					console.log("Found message to add comment to!");
					console.log('newComment:', response.data);
					factory.all_messages[i].comments.push(response.data.comment);
				} 
			}
		});
	}

	return factory;
});