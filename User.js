var mongoose = require('mongoose');
const uri = "mongodb+srv://alluser:alluser@350s20-42mongodb-pvpes.mongodb.net/test?retryWrites=true&w=majority";

//This is gonna be something different depending on where the database is located.
mongoose.connect(uri);



var Schema = mongoose.Schema;


var personVaccineSchema = new Schema({
	id: String,
	date: {type: Date, default: Date.now},
	hospitalId: String,
	verified: Boolean
});



var userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  fullName: String,
  img: {data: Buffer, contentType:String},
  vaccines: [personVaccineSchema],
  hospitalOwner: Boolean,
  staffArray: this,
  medicalAccount: Boolean,
  sentMedicalRequest: Boolean
});



var medRequestSchema = new Schema({
  creator: {type: userSchema, required: true, unique: false},
  description: {type: String, unique: false}
});

var hosRequestSchema = new Schema({
  name: {type: String, required: true, unique: false},
  creator: {type: userSchema, required: true, unique: false},
  location: {type: String, required: true},
  website: String,
  description: {type: String, unique: false}
});

var hosSchema = new Schema({
    owner: {type: userSchema, required: true, unique: false},
    name: {type: String, required: true, unique: true},
    location: {type: String, required: true},
    website: String,
    staffArray: {type: [userSchema]}
});

module.exports = {userModel: mongoose.model('User', userSchema),
medRequestModel: mongoose.model('MedicalRequest', medRequestSchema),
hosRequestModel: mongoose.model('HospitalRequest', hosRequestSchema),
hosModel: mongoose.model('Hospital', hosSchema), personVaccineSchema: mongoose.model('PersonVaccine', personVaccineSchema)};

//export userschema as a class called User
// module.exports = mongoose.model('User', userSchema);
