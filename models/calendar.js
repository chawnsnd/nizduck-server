var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CalendarSchema = new Schema({
    date: { type: Date, required: true },
    category: { type: String, required: true},
    title: { type: String, required: true},
    history: [historySchema],
    images: Array,
    comment: [commentSchema],
    status: {type: String, default: "PUBLIC", uppercase: true}
});

var historySchema = new Schema({
    status: {type: String, default: "PUBLIC", uppercase: true},
    kind: { type: String, required: true},
    date: { type: Date, required: true, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User'}
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

mongoose.model('Calendar', CalendarSchema);