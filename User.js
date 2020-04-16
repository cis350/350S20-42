var mongoose = require('mongoose');

//This is gonna be something different depending on where the database is located.
mongoose.connect('mongodb://localhost:27017/database');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  hospitalOwner: Boolean,
  staffArray: this,
  hospitalArray: [String];
  medicalAccount: Boolean,
  sentMedicalRequest: Boolean
});

var medRequestSchema = new Schema({
  creator: {type: userSchema, required: true, unique: false},
  description: {type: String, unique: false}
});

var hosRequestSchema = new Schema({
  name: {type: String, required: true, unique: true},
  creator: {type: String, required: true},
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

var generalInfo = new Schema({
   publishedBy: {type: String, required: true},
   hospitalName: {type: String, required: true},
   date: Date,
   body: String,
   approved: Boolean
});

module.exports = {userModel: mongoose.model('User', userSchema),
medRequestModel: mongoose.model('MedicalRequest', medRequestSchema),
hosRequestModel: mongoose.model('HospitalRequest', hosRequestSchema),
hosModel: mongoose.model('Hospital', hosSchema),
generalInfo: mongoose.model('GeneralInformation', generalInfo)};

//export userschema as a class called User
// module.exports = mongoose.model('User', userSchema);
