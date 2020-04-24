var express = require('express');
var app = express();
var fs = require('fs');

// This just sends back a message for any URL path not covered above
app.use('/a', (req, res) => {
    res.send('Default message.');
});

// This starts the web server on port 3000.
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alluser:alluser@350s20-42mongodb-pvpes.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/


var schemas = require('./User.js');
var Person = schemas.userModel;
var PersonVaccine = schemas.personVaccineSchema;
var Hospital = schemas.hosModel;
var ScheduleSlot = schemas.scheduleSlotModel;
var VaccineInfo = schemas.vaccineModel;
var Review = schemas.reviewModel;
var CompletedProcedure = schemas.completedProcedureModel;

app.use('/create', (req, res) => {
var newPerson = new Person ({
 // defined in Person.js
 username: req.query.username,
 password: req.query.password,
 fullName: req.query.fullName,
});

newPerson.save( (err) => {
         if (err) {
          res.json( { 'status' : err } );
         } else {
          res.json( { 'status' :'success' } );
         }
    });
});

app.use('/all', (req, res) => {
    Person.find( (err, allPeople) => {
        if (err) {
          res.json( { 'status' : err } );
        } else if (allPeople.length == 0) {
           res.json( { 'status' : 'no people' } );
        } else {
           res.json(allPeople );
        }
    });
});

app.use('/hospitals', (req, res) => {
    Hospital.find( (err, allHospitals) => {
      if (err) {
        res.json( { 'status' : err } );
      } else if (allHospitals.length == 0) {
         res.json( { 'status' : 'no hospitals' } );
      } else {
         var hosNames = []
         allHospitals.forEach( (hospital) => {
             if (!hospital.archived) {
                 hosNames.push(hospital.name);
             }
         });
         res.json(hosNames);
      }
    });
});

app.use('/procedures', (req, res) => {
    var hospital = req.query.hospital;

    ScheduleSlot.find( (err, allSlots) => {
      if (err) {
          res.json( { 'status' : err } );
      } else if (allSlots.length == 0) {
          res.json( { 'status' : 'no openings' } );
      } else {
          var listings = []
          if (hospital && !hospital.archived) {
              allSlots.forEach( (listing) => {
                  if (listing.hospital == hospital && !listing.patient) {
                      listings.push(listing);
                  }
              });
              res.json(listings);
          } else {
              allSlots.forEach( (listing) => {
                  if (!listing.patient) {
                      listings.push(listing);
                  }
              });
              res.json(listings);
          }
      }
  });
});

app.use('/allDoneProcedures', (req, res) => {
    CompletedProcedure.find( (err, allCompleted) => {
        if (err) {
          res.json( { 'status' : err } );
        } else if (allCompleted.length == 0) {
           res.json( { 'status' : 'no people' } );
        } else {
           res.json(allCompleted);
        }
    });
});

app.use('/requestProcedure', (req, res) => {
    console.log("Attempting");
    var username = req.query.username;
    var note = req.query.note;
    var hospital = req.query.hospital;
    var procedure = req.query.procedure;
    Person.findOne( {username: username}, (err, user) => {
        if (err) {
            console.log(err);
            res.end();
        } else if (user) {
            console.log(user);
            console.log("hospital: " + hospital + " procedure: " + procedure);
            console.log(note);
            ScheduleSlot.findOne( {hospital : hospital, vaccine : procedure}, (err, slot) => {
                if (err) {
                    res.json( { 'status' : err } );
                } else if (!slot) {
                    res.json( { 'status' : 'no openings' } );
                } else {
                    // Slot will gain the patient and special notes
                    slot.patient = user;
                    slot.specialNotes = note;
                    slot.save( (err) => {
                        if (err) {
                            res.json({'status' : err});
                        } else {
                            res.json({'status' : "success"});
                        }
                    });
                }
            });
        }
    });
});

app.use('/editInfo', (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    var email = req.query.email;
    var fullName = req.query.fullName;
    var blood = req.query.blood;
    var dob = new Date(Date.parse(req.query.dob));
    Person.findOne( {
     username: username,
      password : password }, (err, person) => {
        if (err) {
            res.json( { 'status' : err } );
        }
        else if (!person) {
           res.json( { 'status' : 'no person' } );
       } else {
        person.fullName = fullName;
        person.email = email;
        person.blood = blood;
        person.dob = dob;
        person.save( (err) => {
          if (err) {
              res.json( { 'status' : err } );
          } else {
               res.json( { 'status' : 'success' } );
          }
        });
      }
    });
  });


app.use('/loginPerson', (req, res) => {
    var searchName = req.query.username;
    var searchPassword = req.query.password;
    Person.findOne( { username: searchName, password: searchPassword }, (err, person) => {
        if (err) {
            res.json( { 'status' : err } );
        } else if (!person) {
          res.json( { 'status' : 'no person' } );
        } else {
          res.json( { 'status' : 'success'  ,'person' : person } );
        }
    });
});

app.use('/addImage', (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    var imgPath = req.query.imgPath;
    Person.findOne( { username: username, password: password }, (err, person) => {
        if (err) {
            res.json( { 'status' : err } );
        } else if (!person) {
            res.json( { 'status' : 'no person' } );
        } else {
            person.img.data = fs.readFileSync(imgPath);
            person.img.contentType = 'image/png';
            person.save( (err) => {
            if (err) {
              res.json( { 'status' : err } );
            } else {
              res.json( { 'status' : 'success' } );
            }
          });
       }
   });
});

app.use('/addVaccine', (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    var vId = req.query.vId;
    var vDate = new Date(Date.parse(req.query.vDate));
    var hospitalId = req.query.hId;
    var newVaccine = new PersonVaccine ({
        id: vId,
        date: vDate,
        hospitalId: hospitalId,
        verified: false
    });

    Person.findOne( { username: username, password: password }, (err, person) => {
        if (err) {
           res.json( { 'status' : err } );
        } else if (!person) {
           res.json( { 'status' : 'no person' } );
        } else {
           person.vaccines.push(newVaccine);
           person.save( (err) => {
             if (err) {
               res.json( { 'status' : err } );
             } else {
               res.json( { 'status' : 'success' } );
             }
         });
       }
   });
});

app.use('/addVaccineInfo', (req, res) => {
var newVaccine = new VaccineInfo ({
 // defined in Person.js
 id: req.query.id,
 name: req.query.name,
 info: req.query.info
});

newVaccine.save( (err) => {
         if (err) {
          res.json( { 'status' : err } );
         } else {
          res.json( { 'status' :'success' } );
         }
    });
});

app.use('/allVaccineInfo', (req, res) => {
    VaccineInfo.find( (err, vaccines) => {
        if (err) {
          res.json( { 'status' : err } );
        } else if (vaccines.length == 0) {
           res.json( { 'status' : 'no people' } );
        } else {
           res.json({'status': 'success', 'vaccines' : vaccines} );
        }
    });
});
