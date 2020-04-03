var mongoose = require('mongoose');

//This is gonna be something different depending on where the database is located.
mongoose.connect('mongodb://localhost:27017/database');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  hospitalOwner: Boolean,
  numberOfStaff: Number,
  //this will be an array of Users of the staff (since usernames are unique)
  staffArray: this,
  medicalAccount: Boolean
});

var medRequestSchema = new Schema({
  creator: {type: userSchema, required: true, unique: true},
  description: {type: String, unique: false}
});

var hosRequestSchema = new Schema({
  creator: {type: userSchema, required: true, unique: false},
  location: String,
  website: String,
  description: {type: String, unique: false}
});

var hosSchema = new Schema({
    owner: userSchema,
    location: String,
    website: String,
    staffArray: [userSchema]
});

module.exports = {userModel: mongoose.model('User', userSchema),
medRequestModel: mongoose.model('MedicalRequest', medRequestSchema),
hosRequestModel: mongoose.model('HospitalRequest', hosRequestSchema),
hosModel: mongoose.model('Hospital', hosSchema)};

//export userschema as a class called User
// module.exports = mongoose.model('User', userSchema);
