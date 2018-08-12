var mongoose = require('mongoose');
var mongooseIncrement = require('mongoose-auto-increment');

var dbName = 'nizduck';
var uri = 'mongodb://localhost/' + dbName;

var options = {
    server: {poolSize: 10}
};

var db = mongoose.createConnection(uri, options);
mongooseIncrement.initialize(db);

db.on('error', err => {
    if(err) console.error('Mongodb connection error :', err);
})

db.once('open', () => {
    console.info('mongodb connected successfully');
})

module.exports = db;