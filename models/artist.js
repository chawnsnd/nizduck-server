var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    ko_name: {type: String, required: true},
    en_name: {type: String, required: true},
    profile: {type: String},
    main_image: {type: String},
    board: {type: Schema.Types.ObjectId, ref: 'Board'},
    calendar: {type: Schema.Types.ObjectId, ref: 'Calendar'},
    status: {type: String, default: "PUBLIC", uppercase: true}
});

mongoose.model('Artist', ArtistSchema);