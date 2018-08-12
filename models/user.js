var mongooose = require('mongoose');
var Schema = moongoose.Schema;

var moment = require('moment');
moment.locale('ko');

var guestBookSchema = new Schema({
    user: userSchema,
    reg_date: { type: Date, default: Date.now},
    content: { type: String, required: true}
});

var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    duckname: { type: String, required: true, unique: true },
    profile: { type: String },
    password: { type: String, required: true },
    salt: { type: String, uppercase: true, required: true },
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    sex: { type: String, required: true },
    bias: { type: Schema.Types.ObjectId, ref: 'Artist' },
    interest: [{type: Schema.Types.ObjectId, ref: 'Artist'}],
    status: {type: String, default: "PUBLIC", uppercase: true},
    post: { type: Array },
    followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    follows: [{type: Schema.Types.ObjectId, ref: 'User'}],
    guest_book: [guestBookSchema]
});

mongooose.model('User', userSchema);