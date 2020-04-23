
//this is the part that connects to the database through express
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var schemas = require('./User.js');
var User = schemas.userModel;
var MedicalRequest = schemas.medRequestModel;
var HospitalRequest = schemas.hosRequestModel;
var Hospital = schemas.hosModel;
var GeneralInformation = schemas.generalInfoModel;
var ScheduleSlot = schemas.scheduleSlotModel;

var currentUser = null;

// Hardcodes an administrator
var adminUser = new User({
username: "administrator",
password: "test",
});

User.find(adminUser, (err, users) => {
  if (err) {
      console.log('uh oh' + err);
      res.json({});
  } else {
      var returnArray = [];
      users.forEach( (user) => {
          returnArray.push(user);
      });

      if (returnArray.length == 0) {
        adminUser.save( (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        });
      }
  }
});

//********************************testing purposes only***************

app.use('/create', (req, res) => {

  var newPerson = new User({
      username: req.body.username,
      password: req.body.password,
  });

  newPerson.save( (err) => {
      if (err) {
          res.type('html').status(200);
          res.write('uh oh: ' + err);
          console.log(err);
          res.end();
      } else {
          res.write('created');
          console.log('created this dude ' + newPerson.username + ' ' + newPerson.password);
          res.end();
      }
  });
});

app.use('/beHospitalOwner', (req, res) => {
  currentUser.hospitalOwner = true;
  currentUser.save( (err) => {
      if (err) {
          res.json({'status' : err});
      } else {
          res.render('differentDashboard', {user: currentUser});
      }
  });
});

app.use('/beMedicalAccount', (req, res) => {
  currentUser.medicalAccount = true;
  currentUser.save( (err) => {
      if (err) {
          res.json({'status' : err});
      } else {
          res.render('differentDashboard', {user: currentUser});
      }
  });
});

//**********************************************************************

app.use('/checkLogin', (req, res) => {
  var queryUser = {};
  if (req.body.username && req.body.password) {
      queryUser = {"username" : req.body.username,
                  "password" : req.body.password};
      User.findOne({username : queryUser.username, password: queryUser.password}, (err, user) => {
          if (err) {
              console.log('uh oh' + err);
              res.redirect('/');
          } else if (!user) {
              res.redirect('/');
          } else {
              currentUser = user;
              if (currentUser.username == "administrator") {
                  res.render('adminDashboard', {user: currentUser});
              } else {
                  res.render('differentDashboard', {user: currentUser});
              }
          }
      });
  } else {
      res.redirect('/');
  }
});

app.get('/home', function (req, res) {
    if (!currentUser) {
        res.redirect('/public/login.html');
    }

    res.render('differentDashboard', {user: currentUser});
});

// Start of creating medical request functionality
app.get('/medicalrequest', function (req, res) {
    if (!currentUser) {
        res.redirect('/public/login.html');
    }
    res.render('upgradeRequest', {user: currentUser, sent: ""});
});

app.use('/createMedRequest', (req, res) => {
  if (!currentUser) {
      res.redirect('/public/login.html');
  } else if (currentUser.medicalAccount) {
      res.render('upgradeRequest', {user: currentUser, sent: "ERROR: " + currentUser.username + " is already certified!"});
  } else if (currentUser.sentMedicalRequest) {
      res.render('upgradeRequest', {user: currentUser, sent: "ERROR: " + currentUser.username + " already has a pending request!"});
  } else if (req.body.input) {
      var newRequest = new MedicalRequest({
        creator: currentUser,
        description: req.body.input,
      });

      newRequest.save( (err) => {
          if (err) {
              console.log(err);
              res.end();
          } else {
              console.log('logged the request');
          }
      });

      currentUser.sentMedicalRequest = true;
      currentUser.save( (err) => {
          if (err) {
              res.json({'status': err});
          } else {
              console.log('logged the request');
          }
      });

      res.render('upgradeRequest', {user: currentUser, sent: currentUser.username + " sent the following: " + req.body.input});
  } else {
      res.render('upgradeRequest', {user: currentUser, sent: "Not Sent"});
  }
});
// End of creating medical request functionality


// Start of creating hospital request functionality
app.get('/hospitalrequest', function (req, res) {
    res.render('hospitalRequest', {user: currentUser, sent: ""});
});

app.use('/createHosRequest', (req, res) => {
    if (!currentUser) {
      res.redirect('/public/login.html');
    }

  if (req.body.hospital && req.body.place) {
      var newRequest = new HospitalRequest({
        creator: currentUser,
        name: req.body.hospital,
        location: req.body.place
      });

      if (req.body.web) {
        newRequest.website = req.body.web;
        console.log("HAS WEBSITE");
      }

      if (req.body.input) {
        newRequest.description = req.body.input;
        console.log("HAS DESCRIPTION");
      }

      newRequest.save( (err) => {
          if (err) {
              console.log(err);
              res.end();
          } else {
              console.log('logged the request');
          }
      });
      res.render('hospitalRequest', {user: currentUser, sent: currentUser.username + " sent the following for: " + req.body.hospital});
  } else {
      res.render('hospitalRequest', {user: currentUser, sent: "Not Sent"});
  }
});
// End of creating hopsital request functionality

// Start of admin actions
app.get('/adminhome', function (req, res) {
    if (!currentUser) {
      res.redirect('/public/login.html');
    }

  if (currentUser.username == 'administrator') {
      res.render('adminDashboard', {user: currentUser});
  } else {
      res.render('differentDashboard', {user: currentUser});
  }
});

// Page for viewing medical requests
app.get('/accountchange', function (req, res) {
    if (!currentUser) {
      res.redirect('/public/login.html');
    }

  if (currentUser.username == 'administrator') {
      MedicalRequest.find( (err, allRequests) => {
          if (err) {
              console.log(err);
              res.end();
          } else if (allRequests.length == 0) {
              res.render('upgradeAccounts', {user: currentUser, requests: null});
          } else {
              res.render('upgradeAccounts', {user: currentUser, requests: allRequests});
          }
      });
  } else {
      res.render('differentDashboard', {user: currentUser});
  }
});

// Page for viewing hospital requests
app.get('/hospitalcreation', function (req, res) {

    if (!currentUser) {
      res.redirect('/public/login.html');
    }
  
  if (currentUser.username == 'administrator') {
      HospitalRequest.find( (err, allRequests) => {
          if (err) {
              console.log(err);
              res.end();
          } else if (allRequests.length == 0) {
              res.render('hospitalCreation', {user: currentUser, requests: null});
          } else {
              res.render('hospitalCreation', {user: currentUser, requests: allRequests});
          }
      });
  } else {
      res.render('differentDashboard', {user: currentUser});
  }
});

// Page for viewing specific medical request
app.use('/viewAccountRequest', (req, res) => {
    if (!currentUser) {
      res.redirect('/public/login.html');
    }
  
  if (currentUser.username == 'administrator' && req.query.name) {
    var name = req.query.name;

    MedicalRequest.find( (err, allRequests) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            allRequests.forEach( (request) => {
                if (request.creator.username == name) {
                    res.render('viewAccountRequest', {user: currentUser, request: request});
                }
            });
        }
    });
  } else {
      res.render('differentDashboard', {user: currentUser});
  }

});

// Page for accepting specific medical request
app.use('/acceptAccountRequest', (req, res) => {
    if (!currentUser) {
      res.redirect('/public/login.html');
    }

  if (currentUser.username == 'administrator' && req.query.name) {
      var name = req.query.name;

      MedicalRequest.find( (err, allRequests) => {
          if (err) {
              console.log(err);
              res.end();
          } else {
              allRequests.forEach( (request) => {
                  if (request.creator.username == name) {
                      request.remove();
                  }
              });
          }
      });

      User.findOne( {username: name}, (err, user) => {
          if (err) {
              console.log(err);
              res.end();
          } else if (user) {
              user.medicalAccount = true;
              user.sentMedicalRequest = false;
              user.save( (err) => {
                  if (err) {
                      res.json({'status' : err});
                  }
              });
          }
      });

      res.render('adminDashboard', {user: currentUser});
  } else {
      res.render('differentDashboard', {user: currentUser});
  }

});

// Page for rejecting specific medical request
app.use('/rejectAccountRequest', (req, res) => {
    if (!currentUser) {
      res.redirect('/public/login.html');
    }

  if (currentUser.username == 'administrator' && req.query.name) {
      var name = req.query.name;

      MedicalRequest.find( (err, allRequests) => {
          if (err) {
              console.log(err);
              res.end();
          } else {
              allRequests.forEach( (request) => {
                  if (request.creator.username == name) {
                      request.remove();
                  }
              });
          }
      });

      User.findOne( {username: name}, (err, user) => {
          if (err) {
              console.log(err);
              res.end();
          } else {
              user.sentMedicalRequest = false;
              user.save( (err) => {
                  if (err) {
                      res.json({'status': err});
                  }
              });
          }
      });

      res.render('adminDashboard', {user: currentUser});
  } else {
      res.render('differentDashboard', {user: currentUser});
  }

});

// Page for viewing specific hospital request
app.use('/viewHospitalRequest', (req, res) => {
    if (!currentUser) {
      res.redirect('/public/login.html');
    }

    if (currentUser.username == 'administrator' && req.query.name) {
      var name = req.query.name;

      HospitalRequest.findOne( {name: name}, (err, request) => {
          if (err) {
              console.log(err);
              res.end();
          } else {
              res.render('viewHospitalRequest', {user: currentUser, request: request});
          }
      });
    } else {
      res.render('differentDashboard', {user: currentUser});
    }
});

// Page for accepting specific hospital request
app.use('/acceptHospitalRequest', (req, res) => {
    if (!currentUser) {
      res.redirect('/public/login.html');
    }

  if (currentUser.username == 'administrator' && req.query.name && req.query.hospital) {
      var name = req.query.hospital;
      var username = req.query.name;

      Hospital.findOne( {name: name}, (err, hospital) => {
          if (err) {
              console.log(err);
              res.end();
          } else if (!hospital) {
              //If hospital name does not exist, then create it
              HospitalRequest.findOne( {name: name}, (err, request) => {
                  if (err) {
                      console.log(err);
                      res.end();
                  } else {
                      console.log("CREATOR: " + request.creator.username);

                      var newHospital = new Hospital({
                          owner: request.creator,
                          name: request.name,
                          location: request.location,
                          website: request.website,
                          archived: false
                      });

                      console.log(newHospital);

                      newHospital.save( (err) => {
                         if (err) {
                             console.log("HOSPITAL SAVE THROWN");
                             res.json({'status': err});
                         } else {
                             console.log("Hospital made");
                         }
                      });

                      request.remove();
                  }
                  //Set user account to hospital owner
                  User.findOne( {username: username}, (err, user) => {
                      if (err) {
                          console.log(err);
                          res.end();
                      } else if (user) {
                          user.hospitalOwner = true;
                          user.hospitalArray.push(name);
                          user.save( (err) => {
                             if (err) {
                                 res.json({'status': err});
                             }
                          });
                      }
                  });
              });

          } else {
              //If hospital of same name exists, delete request
              HospitalRequest.findOne( {name: name}, (err, request) => {
                  if (err) {
                      console.log(err);
                      res.end();
                  } else {
                      request.remove();
                  }
              });

          }
      });

      res.render('adminDashboard', {user: currentUser});
  } else {
      res.render('differentDashboard', {user: currentUser});
  }

});

// Page for rejecting specific hospital request
app.use('/rejectHospitalRequest', (req, res) => {
    if (!currentUser) {
      res.redirect('/public/login.html');
    }

    console.log(req.query.hospital);

  if (currentUser.username == 'administrator' && req.query.hospital) {
      var name = req.query.hospital;

      HospitalRequest.findOne( {name: name}, (err, request) => {
          if (err) {
              console.log(err);
              res.end();
          } else {
              request.remove();
          }
      });

      res.render('adminDashboard', {user: currentUser});
  } else {
      res.render('differentDashboard', {user: currentUser});
  }

});

app.use('/hospitallist', (req, res) => {
    if (!currentUser) {
      res.redirect('/public/login.html');
    }
  
  if (currentUser.username == 'administrator') {
      var name = req.query.name;

      Hospital.find( (err, hospitals) => {
          if (err) {
              console.log(err);
              res.end();
          } else {
              res.render('hospitalList', {hospitals: hospitals});
          }
      });
  } else {
      res.render('differentDashboard', {user: currentUser});
  }

});


app.use('/archiveHospital', (req, res) => {
    //getting a list of all the hospitals
    if (!currentUser) {
      res.redirect('/public/login.html');
    }
    Hospital.find( (err, allHospitals) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            var hospitalList = [];
            allHospitals.forEach( (hosp) => {
                if (!hosp.archived) {
                    hospitalList.push(hosp);
                } 
            });
            res.render('archiveHospital', {hospitals: allHosptials});
        }
    });
});

app.use('/viewArchiveHospital', (req, res) => {
    //viewing one specific hospital
    if (!currentUser) {
      res.redirect('/public/login.html');
    }
    Hospital.find( (err, allHospitals) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            allHospitals.forEach( (hos) => {
                if (hos.name == req.query.name && hos.owner.username == req.query.owner && hos.location == req.query.location) {
                    res.render('viewArchiveHospital', {hosptial: hos});
                } 
            });
        }
    });
});

app.use('/archiveSelectedHospital', (req, res) => {
    //archiving one specific hospital
    if (!currentUser) {
        res.redirect('/public/login.html');
    }
    Hospital.find( (err, allHospitals) => {
       if (err) {
           console.log(err);
           res.end();
       } else {
           allHospitals.forEach( (hos) => {
                if (hos.name == req.query.name && hos.owner.username == req.query.owner && hos.location == req.query.location) {
                    
                    hos.archived = true;
                    hos.staffArray = [];
                    hos.save( (err) => {
                       if (err) {
                           console.log(err);
                           res.end();
                       } else {
                           //delete all null-patient slots with this hos name
                           ScheduleSlot.find( (err, allSlots) => {
                              if (err) {
                                  console.log(err);
                                  res.end();
                              } else {
                                  allSlots.forEach((slot) => {
                                        if (!approved && slot.hospital == hos.name && !slot.patient) {
                                            slot.remove();
                                        }
                                  });
                                  
                                  
                              }
                           });
                           
                           res.render('archive hospital');
                       }
                    });
                }
           });
       }
    });
});
// End of admin action

// Page for observing own hospital
app.use('/myHospital', (req, res) => {
  //get all of the hospitals
  var hospitals = [];
  Hospital.find( (err, allHospitals) => {
     if (err) {
         console.log(err);
         res.end();
     } else {
         allHospitals.forEach( (hospital) => {
             currentUser.hospitalArray.forEach( (hospitalName) => {
                if (!hospital.archived && hospital.name == hospitalName) {
                    hospitals.push(hospital);
                }
             });
         });
     }
     res.render('myHospital', {user: currentUser, hospitals: hospitals});
  });
});

app.use('/addStaff', (req, res) => {
  //status is -1 if has blank fields, 0 if not med acct, 1 if staff does not exist, 2 if already in hospital
  if (req.body.enterStaffUsernameAdd && req.body.chooseHospital) {
      User.findOne( {username: req.body.enterStaffUsernameAdd}, (err, staff) => {
         if (err) {
             res.render('differentDashboard', {user: currentUser});
         } else if (!staff) {
             //this user does not exist
             res.render('staffMemberError', {user: currentUser, status: 1});
         } else {
             if (!staff.medicalAccount) {
                 //user exists but not a doctor
                 res.render('staffMemberError', {user: currentUser, status: 0});
             } else {
                 //find the hospital schema that is being referenced
                 Hospital.findOne({name: req.body.chooseHospital}, (err, hospital) => {
                    if (err) {
                        res.render('differentDashboard', {user: currentUser});
                    } else {
                        if (!hospital.staffArray) {
                            hospital.staffArray = [];
                        }

                        var alreadyIn = false;
                        //check if user is already part of hospital
                        for (var i = 0; i < hospital.staffArray.length; i++) {
                            if (staff.username == hospital.staffArray[i]){
                                res.render('staffMemberError', {user: currentUser, status: 2});
                                alreadyIn = true;
                            }
                        }

                        //no error had occured, so rendering error does not happen
                        if (!alreadyIn) {
                            hospital.staffArray.push(staff.username);
                            hospital.save( (err) => {
                               if (err) {
                                   res.json({'status': err});
                               } else {
                                   if (!staff.employedAt) {
                                       staff.employedAt = [];
                                   }

                                   staff.employedAt.push(hospital.name);

                                   staff.save( (err) => {
                                       if (err) {
                                           res.json({'status': err});
                                       } else {
                                           //get hospitals to render the myHospital dashboard
                                           var hospitals = [];
                                           Hospital.find( (err, allHospitals) => {
                                             if (err) {
                                                 console.log(err);
                                                 res.end();
                                             } else {
                                                 allHospitals.forEach( (hospital) => {
                                                     currentUser.hospitalArray.forEach( (hospitalName) => {
                                                        if (hospital.name == hospitalName) {
                                                           hospitals.push(hospital);
                                                        }
                                                     });
                                                 });
                                             }
                                               res.render('myHospital', {user: currentUser, hospitals: hospitals});
                                          });
                                        }
                                    });
                               }
                            });
                        }
                    }
                 });
             }
         }
      });
  } else {
      res.render('staffMemberError', {user: currentUser, status: -1});
  }
});

app.use('/removeStaff', (req, res) => {
  //status -1: empty fields, status 0: not doctor, status 1: not existing, status 3: not in hospital
    if (req.body.enterStaffUsernameRemove && req.body.chooseHospital) {
        User.findOne( {username: req.body.enterStaffUsernameRemove}, (err, staff) => {
            if (err) {
                res.render('differentDashboard', {user: currentUser});
            } else if (!staff) {
                //does not exist
                res.render('staffMemberError', {user: currentUser, status: 1});
            } else {
                if (!staff.medicalAccount) {
                    //not a doctor
                    res.render('staffMemberError', {user: currentUser, status: 0});
                } else {
                    Hospital.findOne({name: req.body.chooseHospital}, (err, hospital) => {
                        if (err) {
                            res.render('differentDashboard', {user: currentUser});
                        } else {
                            var index = -1;
                            for (var i = 0; i < hospital.staffArray.length; i++) {
                                if (staff.username == hospital.staffArray[i]) {
                                    index = i;
                                }
                            }

                            if (index < 0) {
                                //account is not in the hospital
                                res.render('staffMemberError', {user: currentUser, status: 3});
                            } else {
                                //remove staff member and save
                                hospital.staffArray.splice(index, 1);
                                hospital.save( (err) => {
                                    if (err) {
                                        res.json({'status': err});
                                    } else {
                                        //get all hospitals to render the myhospital dashboard
                                        var index = -1;
                                        for (var i = 0; i < staff.employedAt.length; i++) {
                                            if (staff.employedAt[i] == hospital.name) {
                                                index = i;
                                            }
                                        }

                                        staff.employedAt.splice(index, 1);

                                        staff.save( (err) => {
                                            if (err) {
                                                res.json({'status': err});
                                            } else {
                                                var hospitals = [];
                                                Hospital.find( (err, allHospitals) => {
                                                    if (err) {
                                                        console.log(err);
                                                        res.end();
                                                    } else {
                                                        allHospitals.forEach( (hospital) => {
                                                            currentUser.hospitalArray.forEach( (hospitalName) => {
                                                                if (hospital.name == hospitalName) {
                                                                    hospitals.push(hospital);
                                                                }
                                                            });
                                                        });
                                                    }
                                                    res.render('myHospital', {user: currentUser, hospitals: hospitals});
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    } else {
        res.render('staffMemberError', {user: currentUser, status: -1});
    }
});

// Page for viewing user's own requests
app.get('/myRequests', function (req, res) {
  MedicalRequest.find( (err, medRequests) => {
    if (err) {
        console.log(err);
        res.end();
    } else if (medRequests.length == 0) {
        HospitalRequest.find( (err, hosRequests) => {
          if (err) {
              console.log(err);
              res.end();
          } else if (hosRequests.length == 0) {
              res.render('myRequests', {user: currentUser, requests: null, more: null});
          } else {
              res.render('myRequests', {user: currentUser, requests: null, more: hosRequests});
          }
        });
    } else {
        HospitalRequest.find( (err, hosRequests) => {
          if (err) {
              console.log(err);
              res.end();
          } else if (hosRequests.length == 0) {
              res.render('myRequests', {user: currentUser, requests: medRequests, more: null});
          } else {
              res.render('myRequests', {user: currentUser, requests: medRequests, more: hosRequests});
          }
        });
    }
  });
});

//way for doctors to submit information about vaccines
app.use('/addGeneralVaccineInformation', function (req, res) {
    if (req.body.enterInformation && currentUser.medicalAccount) {
        var newInformation = new GeneralInformation({
            publishedBy: currentUser.username,
            hospitalName: req.body.enterHospital,
            date: new Date(),
            body: req.body.enterInformation,
            approved: false
        });
        newInformation.save( (err) => {
           if (err) {
               console.log(err);
               res.end();
           } else {
               console.log('logged new info');
           }
        });
        res.render('addVaccineInfo', {user: currentUser, sent: "Thank you for your contribution! If the administrator approves the post, it will be published for all users to see."});
    } else {
        res.render('addVaccineInfo', {user: currentUser, sent: "Please enter text into the body, don't submit a blank request."});
    }
});

//admin view of list of general info requests
app.get('/generalInfoRequest', function (req, res) {
    if (currentUser.username == 'administrator') {
        GeneralInformation.find( (err, allInfo) => {
            if (err) {
                console.log(err);
                res.end();
            } else if (allInfo.length == 0) {
                res.render('generalInfoRequest', {user: currentUser, requests: null});
            } else {
                var toReturn = [];
                allInfo.forEach( (request) => {
                    if (!request.approved) {
                        toReturn.push(request);
                    }
                });
                toReturn.sort(function(a, b) {return b.date.getTime() - a.date.getTime()});
                res.render('generalInfoRequest', {user: currentUser, requests: toReturn});
            }
        });
    } else {
        req.render('differentDashboard', {user: currentUser});
    }
});

app.use('/viewGeneralInfoRequest', function (req, res) {
    if (currentUser.username == 'administrator') {
        var name = req.query.publishedBy;
        var date = req.query.date;

        GeneralInformation.find( (err, requests) => {
           if (err) {
               console.log(err);
               res.end();
           } else {
               var toReturn;
               requests.forEach( (request) => {
                   if (request.publishedBy == name && date == request.date.getTime()) {
                       toReturn = request;
                   }
               });
               if (!toReturn) {
                   res.render('adminDashboard', {user: currentUser});
               } else {
                   res.render('viewGeneralInfoRequest', {user: currentUser, request: toReturn});
               }

           }
        });
    } else {
        res.render('differentDashboard', {user: currentUser});
    }
});

app.use('/acceptGeneralInfoRequest', function (req, res) {
   if (currentUser.username == 'administrator') {
       var name = req.query.publishedBy;
       var date = req.query.date;

       GeneralInformation.find( (err, allInfo) => {
          if (err) {
              console.log(err);
              res.end();
          } else {
              allInfo.forEach( (info) => {
                 if (info.publishedBy == name && info.date.getTime() == date) {
                     info.approved = true;
                     info.save( (err) => {
                        if (err) {
                            res.json({'status': err});
                        }
                     });
                 }
              });
          }
       });
       res.render('adminDashboard', {user: currentUser});
   } else {
       res.render('differentDashboard', {user: currentUser});
   }
});

app.use('/rejectGeneralInfoRequest', function (req, res) {
   if (currentUser.username == 'administrator') {
       var name = req.query.publishedBy;
       var date = req.query.date;

       GeneralInformation.find( (err, allInfo) => {
          if (err) {
              console.log(err);
              res.end();
          } else {
              allInfo.forEach( (info) => {
                 if (info.publishedBy == name && info.date.getTime() == date) {
                     info.remove();
                 }
              });
          }
       });
       res.render('adminDashboard', {user: currentUser});
   } else {
       res.render('differentDashboard', {user: currentUser});
   }
});

//renders all of the accepted posts in (hopefully) descending order of date
app.get('/generalInformation', function (req, res) {
    var toRender = [];
   GeneralInformation.find( (err, allInfo) => {
      if (err) {
          res.end();
      } else {
          allInfo.forEach( (info) => {
             if (info.approved) {
                 toRender.push(info);
             }
          });
          toRender.sort(function(a, b) {return b.date.getTime() - a.date.getTime()});
          res.render('generalInformation', {user: currentUser, posts: toRender});
      }
   });
});

app.get('/addVaccineInfo', function (req, res) {
    res.render('addVaccineInfo', {user: currentUser, sent: ""});
});

//Medical users can add slots for users to sign up to get vaccines at a certain hospital
app.get('/addScheduleSlots', function (req, res) {
    ScheduleSlot.find( (err, allSlots) => {
        if (err) {
            res.end();
        } else {
            var mySlots = [];

            allSlots.forEach( (slot) => {
               if (slot.doctor.username == currentUser.username) {
                   mySlots.push(slot);
               }
            });

            mySlots.sort(function(a, b) {return b.date.getTime() - a.date.getTime()});
            
            Hospital.find( (err, allHospitals) => {
                if (err) {
                    console.log(err);
                    res.end();
                } else {
                    allHospitals.forEach((hospital) => {
                        var index = -1;
                        for (var i = 0; i < currentUser.employedAt.length; i++) {
                            if (currentUser.employedAt[i]
                                == hospital.name && hospital.archived) {
                                index = i;
                                } 
                        }
                        if (index >= 0) {
                            currentUser.employedAt.splice(index, 1);
                        }
                    });
                }
            });

            res.render('addScheduleSlots', {user: currentUser, schedule: mySlots, sent: ""});
        }
    });
});

//this adds another slot to the schedule for this doctor
app.use('/addNewSlot', function (req, res) {
    ScheduleSlot.find( (err, allSlots) => {
       if (err) {
           res.end();
       } else {
           //check if slot at the same time
           var doubleBooked = false;
           var mySlots = [];
           var date = new Date(req.body.enterDate);
           allSlots.forEach( (slot) => {
               if (slot.doctor.username == currentUser.username) {
                   mySlots.push(slot);
                   if (slot.date.getTime() == date.getTime()) {
                       doubleBooked = true;
                   }
               }
           });

           if (doubleBooked) {
               res.render('addScheduleSlots', {user: currentUser, schedule: mySlots, sent: "Oops! You double booked yourself, choose a different time."});
           } else {
               //if not, then add slot
               var newSlot = new ScheduleSlot({
                   doctor: currentUser,
                   hospital: req.body.enterHospital,
                   date: new Date(req.body.enterDate),
                   vaccine: req.body.enterVaccine
               });

               newSlot.save( (err) => {
                  if (err) {
                      res.json({'status': err});
                  } else {
                      res.render('addScheduleSlots', {user: currentUser, schedule: mySlots, sent: "Thank you for scheduling a time slot! Users appreciate you!"});
                  }
               });
           }
       }
    });
});

//tab that medical users can use to accept user slot requests, and get special notes from the user
app.use('/viewAvailableSlots', function (req, res) {
   //have to gather slots that do not have a patient and then display those
    ScheduleSlot.find((err, allSlots) => {
        var openSlots = [];

        allSlots.forEach( (slot) => {
           if (!slot.patient) {
               openSlots.push(slot);
           }
        });

        res.render('availableSlots', {user: currentUser, schedule: openSlots});
    });
});

//medical user chooses to schedule with this particular slot
app.use('/scheduleRequest', function (req, res) {
    var doctorName = req.query.doctor;
    var date = req.query.date;

    ScheduleSlot.find( (err, allSlots) => {
        var request;
        allSlots.forEach( (slot) => {
           if (slot.doctor.username == doctorName && slot.date.getTime() == date) {
               request = slot;
           }
        });
        res.render('finishScheduleRequest', {user: currentUser, request: request});
    });
});

//tab that users can see and request an available slot, and write a special note that gets sent to the doctor
app.use('/processScheduleRequest', function (req, res) {
    var note = req.body.enterNote;
    var doctorName = req.query.doctor;
    var date = req.query.date;

    ScheduleSlot.find( (err, allSlots) => {
        var request;
        allSlots.forEach( (slot) => {
           if (slot.doctor.username == doctorName && slot.date.getTime() == date) {
               request = slot;
           }
        });

        request.patient = currentUser;
        request.specialNotes = note;
        request.save( (err) => {
            if (err) {
                res.render('differentDashboard', {user: currentUser});
            } else {
                ScheduleSlot.find( (err, allSlots) => {
                    var mySlots = [];

                    allSlots.forEach( (slot) => {
                        if (slot.patient && slot.patient.username == currentUser.username && slot.approved) {
                            mySlots.push (slot);
                        }
                    });
                    mySlots.sort(function(a, b) {return b.date.getTime() - a.date.getTime()});
                    res.render('mySchedule', {user: currentUser, schedule: mySlots});
                });
            }
        });
    });
});

//tab that users can see what approved slots they have
app.use('/mySchedule', function (req, res) {
    ScheduleSlot.find( (err, allSlots) => {
        var mySlots = [];

        allSlots.forEach( (slot) => {
            if (slot.patient && slot.patient.username == currentUser.username && slot.approved) {

                mySlots.push(slot);
            }
        });
        mySlots.sort(function(a, b) {return b.date.getTime() - a.date.getTime()});
        res.render('mySchedule', {user: currentUser, schedule: mySlots});
    });
});

//tab that doctors can view a list of requests for vaccines they sent out
app.use('/listScheduleRequest', function (req, res) {
    if (currentUser.medicalAccount) {
        ScheduleSlot.find( (err, allSlots) => {
            var mySlots = [];

            allSlots.forEach( (slot) => {
               if (slot.doctor.username == currentUser.username && !slot.approved) {
                   mySlots.push(slot);
               }
            });

            res.render('listScheduleRequests', {user: currentUser, schedule: mySlots});
        });
    } else {
        res.render('differentDashboard', {user: currentUser});
    }
});

//doctors can view and approve a specific vaccine they requested to view
app.use('/viewSlotRequest', function (req, res) {
    ScheduleSlot.find( (err, allSlots) => {
       var slotToView;

        allSlots.forEach( (slot) => {
            if (slot.patient && slot.patient.username == req.query.patient && slot.doctor.username == currentUser.username && slot.date.getTime() == req.query.date) {
                slotToView = slot;
            }
        });

        res.render('viewSlotRequest', {user: currentUser, request: slotToView});
    });
});

//doctor accepted a specific vaccine slot
app.use('/acceptSlotRequest', function (req, res) {
    if (currentUser.medicalAccount) {
        ScheduleSlot.find( (err, allSlots) => {
           var slotToAccept;

            allSlots.forEach( (slot) => {
               if (slot.patient && slot.patient.username == req.query.patient && slot.doctor.username == currentUser.username && slot.date.getTime() == req.query.date) {
                   slotToAccept = slot;
               }
            });

            slotToAccept.approved = true;

            slotToAccept.save( (err) => {
               if (err) {
                   res.json({'status': err});
               } else {
                   res.render('differentDashboard', {user: currentUser});
               }
            });
        });
    } else {
        res.render('differentDashboard', {user: currentUser});
    }
});

//doctor rejected a specific vaccine slot
app.use('/rejectSlotRequest', function (req, res) {
    if (currentUser.medicalAccount) {
        ScheduleSlot.find( (err, allSlots) => {
            allSlots.forEach( (slot) => {
                if (slot.patient && slot.patient.username == req.query.patient && slot.doctor.username == currentUser.username && slot.date.getTime() == req.query.date) {
                    slot.remove();
                }
            });

            res.render('differentDashboard', {user: currentUser});
        });
    } else {
        res.render('differentDashboard', {user: currentUser});
    }
});

app.use('/public', express.static('public'));

app.use('/styles', express.static('styles'));

app.use('/logout', (req, res) => {
    currentUser = null;
    res.redirect('/public/login.html');
});

app.use('/', (req, res) => {
   if (currentUser) {
       res.render('differentDashboard', {user: currentUser});
   } else {
       res.redirect('/public/login.html');
   }

});

app.use('/', (req, res) => {
  if (currentUser) {
      res.render('differentDashboard', {user: currentUser});
  } else {
      res.redirect('/public/login.html');
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
