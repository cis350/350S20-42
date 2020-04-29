/*var mongoose = require('mongoose');

//Atlas Database (Controlled by Ali)
 const uri = "mongodb+srv://alluser:alluser@350s20-42mongodb-pvpes.mongodb.net/test?retryWrites=true&w=majority";
 mongoose.connect(uri);

// Local Database
//mongoose.connect('mongodb://localhost:27017/database');

var Schema = mongoose.Schema;

var vaccineSchema = new Schema({
  id: String,
  name: String,
  info: String
});

var personVaccineSchema = new Schema({
	id: String,
	date: {type: Date, default: Date.now},
	hospitalId: String,
	verified: Boolean
});

var personTravelSchema = new Schema({
  country: String,
  start: {type: Date, default: Date.now},
  end: {type: Date, default: Date.now}
});


var userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  hospitalOwner: Boolean,
  hospitalArray: [String],
  employedAt: [String],
  medicalAccount: Boolean,
  sentMedicalRequest: Boolean,
  fullName: String,
  img: {data: Buffer, contentType:String},
  vaccines: [personVaccineSchema],
  
  email: String,
  blood: String,
  dob: Date
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
personTravelSchema: mongoose.model('PersonTravel', personTravelSchema),
generalInfoModel: mongoose.model('GeneralInformation', generalInfo),
scheduleSlotModel: mongoose.model('ScheduleSlot', scheduleSlot),
vaccineModel: mongoose.model('VaccineInfo', vaccineSchema)};

*/


var mongoose = require('mongoose');

//Atlas Database (Controlled by Ali)
// const uri = "mongodb+srv://alluser:alluser@350s20-42mongodb-pvpes.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(uri);

// Local Database
mongoose.connect('mongodb://localhost:27017/database');

var Schema = mongoose.Schema;

var vaccineSchema = new Schema({
  id: String,
  name: String,
  info: String
});

var personTravelSchema = new Schema({
  country: String,
  start: {type: Date, default: Date.now},
  end: {type: Date, default: Date.now}
});


var personVaccineSchema = new Schema({
  id: String,
  date: {type: Date, default: Date.now},
  hospitalId: String,
  verified: Boolean
});

var userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  hospitalOwner: Boolean,
  hospitalArray: [String],
  employedAt: [String],
  medicalAccount: Boolean,
  sentMedicalRequest: Boolean,
  fullName: String,
  img: {data: Buffer, contentType:String},
  travels: [personTravelSchema],
  vaccines: [personVaccineSchema],
  email: String,
  blood: String,
  dob: Date
});

var completedProcedureSchema = new Schema({
  username: String,
  hospital: String,
  doctor: String,
  procedure: String
});

var reviewSchema = new Schema({
  username: String,
  hospital: String,
  review: String
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
    staffArray: [String],
    archived: Boolean
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
personTravelSchema: mongoose.model('PersonTravel', personTravelSchema),
generalInfoModel: mongoose.model('GeneralInformation', generalInfo),
scheduleSlotModel: mongoose.model('ScheduleSlot', scheduleSlot),
vaccineModel: mongoose.model('VaccineInfo', vaccineSchema),
reviewModel: mongoose.model('Review', reviewSchema),
completedProcedureModel: mongoose.model('CompletedProcedure', completedProcedureSchema)};
