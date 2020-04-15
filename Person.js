const uri = "mongodb+srv://alluser:alluser@350s20-42mongodb-pvpes.mongodb.net/test?retryWrites=true&w=majority";
var mongoose = require('mongoose');
mongoose.connect(uri);

var Schema = mongoose.Schema;

var personVaccineSchema = new Schema({
	id: String,
	date: {type: Date, default: Date.now},
	hospitalId: String,
	verified: Boolean
});

var personSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    fullName: String,
    img: {data: Buffer, contentType:String},
    vaccines: [personVaccineSchema]
});
module.exports = mongoose.model('Person', personSchema);
