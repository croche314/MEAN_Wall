var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	username: String
}, {timestamps:true});

var CommentSchema = new mongoose.Schema({
	_author_id: {type:Schema.Types.ObjectId, ref: 'User'},
	text: String
}, {timestamps:true});

var MessageSchema = new mongoose.Schema({
	_author_id: {type:Schema.Types.ObjectId, ref:'User'},
	comments: [CommentSchema],
	text: String
}, {timestamps:true});

mongoose.model('User', UserSchema);
mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);

