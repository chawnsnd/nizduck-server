var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
moment.locale('ko');

var boardSchema = new Schema({
    title: { type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    notice: { type: Boolean},
    content: { type: String, required: true},
    reg_date: { type: Date, default: Date.now},
    update_date: { type: Date, defualt: Date.now},
    artist: { type: Schema.Types.ObjectId, ref: 'Artist'},
    view_count: { type: Number, defualt: 0},
    ip: { type: String, required: false },
    status: {type: String, default: "PUBLIC", uppercase: true},
    // votes: [voteSchema],
    // blames: [blameSchema],
    // comments: [commentSchema]
});

var voteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reg_date: { type: Date, defualt: Date.now }
});

var blameSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reg_date: { type: Date, defualt: Date.now }
});

var commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    author_name: { type: String, required: true },
    anonymous: {type: Boolean},
    ip: { type: String, required: false },
	content: {type: String, required: true},
    reg_date: {type: Date, default: Date.now},
    status: {type: String, default: "PUBLIC", uppercase: true},
	update_date: {type: Date, default: Date.now},
	vote: [voteSchema],
	blame: [blameSchema]
});

mongoose.model('Board', boardSchema);