var mongoose = require('mongoose');
var User = mongoose.model('User');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');
var controllers = require('../controllers/controller.js');

module.exports = function(app) {
	app.get('/', function(req,res) {
		console.log('Found / route');
	});

	//*********** ALL USERS ***********
	app.get('/user/all', function(req,res) {
		controllers.showAllUsers(req,res);
	});

	//*********** NEW USER ***********
	app.post('/user/new/:username', function(req,res) {
		controllers.createUser(req,res);
	});

	//*********** FIND USER ***********
	app.get('/user/find/:username', function(req,res) {
		controllers.findUser(req,res);
	})

	//*********** ALL MESSAGES ***********
	app.get('/message/all', function(req,res) {
		controllers.showAllMessages(req,res);
	});

	//*********** NEW MESSAGE ***********
	app.post('/message/new/:user_id', function(req,res) {
		console.log('routes: req.body:', req.body);
		controllers.createMessage(req,res);
	});

	//*********** ALL COMMENTS ***********
	app.post('/comment/all', function(req,res) {
		controllers.showAllComments(req,res);
	});
	
	//*********** NEW COMMENT ***********
	app.post('/comment/new/:user_id/:message_id', function(req,res) {
		controllers.createComment(req,res);
	});

	//*********** DELETE MESSAGE ***********
	app.delete('/message/:message_id', function(req,res) {
		controllers.removeMessage(req,res);
	});

	//*********** REMOVE ALL COMMENTS FROM MESSAGE ***********
	app.delete('/comment/:message_id', function(req,res) {
		controllers.removeComments(req,res);
	});
}