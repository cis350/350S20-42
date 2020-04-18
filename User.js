var mongoose = require('mongoose');

//Atlas Database (Controlled by Ali)
// const uri = "mongodb+srv://alluser:alluser@350s20-42mongodb-pvpes.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(uri);

// Local Database
mongoose.connect('mongodb://localhost:27017/database');

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
	hospitalArray: [String],
	employedAt: [String],
  medicalAccount: Boolean,
  sentMedicalRequest: Boolean
});

var medRequestSchema = new Schema({
  creator: {type: userSchema, required: true, unique: false},
  description: {type: String, unique: false}
});

var hosRequestSchema = new Schema({
  name: {type: String, required: true, unique: false},
  creator: {type: userSchema, required: true},
  location: {type: String, required: true},
  website: String,
  description: {type: String, unique: false}
});

var hosSchema = new Schema({
    owner: {type: userSchema, required: true, unique: false},
    name: {type: String, required: true, unique: false},
    location: {type: String, required: true},
    website: String,
    staffArray: [String]
});

var generalInfo = new Schema({
   publishedBy: {type: String, required: true},
   hospitalName: {type: String, required: true},
   date: Date,
   body: String,
   approved: Boolean
});

var scheduleSlot = new Schema({
    doctor: {type: userSchema, required: true},
    hospital: {type: String, required: true},
    patient: {type: userSchema},
    date: {type: Date, required: true},
    vaccine: {type: String, required: true},
    specialNotes: String,
    approved: Boolean
});

module.exports = {userModel: mongoose.model('User', userSchema),
medRequestModel: mongoose.model('MedicalRequest', medRequestSchema),
hosRequestModel: mongoose.model('HospitalRequest', hosRequestSchema),
hosModel: mongoose.model('Hospital', hosSchema),
personVaccineSchema: mongoose.model('PersonVaccine', personVaccineSchema),
generalInfoModel: mongoose.model('GeneralInformation', generalInfo),
scheduleSlotModel: mongoose.model('ScheduleSlot', scheduleSlot)};
