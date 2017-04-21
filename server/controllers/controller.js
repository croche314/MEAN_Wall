// *********** CONTROLLERS ***********
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = mongoose.model('User');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

module.exports = {
	// Show All Users
	showAllUsers: function(req,res) {
		User.find({}, function(err, all_users) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:'Found All Users!', all_users:all_users});
			}
		});
	},
	// Create User
	createUser: function(req,res) {
		var newUser = new User({
			username: req.params.username
		});
		newUser.save(function(err) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:'Created new user!',user:newUser});
			}
		})
	},
	// Find User
	findUser: function(req,res) {
		User.find({username: req.params.username}, function(err, foundUser) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:'Found user!', user: foundUser});
			}
		});
	},
	// Show Messages
	showAllMessages: function(req,res) {
		Message.find({})
		.populate('_author_id')
		.populate('comments')
		.populate('comments._author_id')
		.exec(function(err,messages) {
			res.json({message: 'All Messages', all_messages:messages});
		});
	},
	// Create Message
	createMessage: function(req,res) {
		console.log('message_text:', req.body);
		var newMessage = new Message({
			_author_id: req.params.user_id,
			text: req.body.message_text
		});
		newMessage.save(function(err) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				console.log("saved new message to Message!")
				res.json({message:'Created new message!',newMessage:newMessage});
			}
		});
	},
	// Create Comment
	createComment: function(req,res) {
		Message.findById(req.params.message_id, function(err, thisMessage) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				var newComment = new Comment({
					_author_id: req.params.user_id,
					text: req.body.comment_text
				});
				thisMessage.comments.push(newComment);
				thisMessage.save(function(err) {
					if(err) {
						console.log("*********** ERRORS ***********");
						console.log(err);
						console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
						res.json({message:"Error!", error:err})	
					} else {
						res.json({message:'Created new comment!', comment:newComment});
					}
				})
			}
		});
	},
	
	// Delete Message
	removeMessage: function(req,res) {
		Message.remove({_id:req.params.message_id}, function(err) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				res.json({message:"Message deleted!"});
			}
			
		})
	},

	// Delete Comment (remove all comments from a specific message)
	removeComments: function(req,res) {
		Message.findById(req.params.message_id, function(err, thisMessage) {
			if(err) {
				console.log("*********** ERRORS ***********");
				console.log(err);
				console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
				res.json({message:"Error!", error:err})
			} else {
				console.log(thisMessage);
				thisMessage.comments = [];
				thisMessage.save(function(err) {
					if(err) {
						console.log("*********** ERRORS ***********");
						console.log(err);
						console.log("^^^^^^^^^ END ERRORS ^^^^^^^^^")
						res.json({message:"Error!", error:err})
					} else {
						res.json({message:'Comments deleted from message!'});	
					}
				})
			}
		});
	}
}