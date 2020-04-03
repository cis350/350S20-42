
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

var currentUser = null;

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
  res.render('differentDashboard', {user: currentUser});
});

app.get('/medicalrequest', function (req, res) {
  res.render('upgradeRequest', {user: currentUser, sent: ""});
});

app.use('/createMedRequest', (req, res) => {
  if (req.body.input && !currentUser.medicalAccount) {
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

      res.render('upgradeRequest', {user: currentUser, sent: currentUser.username + " sent the following: " + req.body.input});
  } else if (req.body.input && currentUser.medicalAccount) {
      res.render('upgradeRequest', {user: currentUser, sent: "ERROR: " + currentUser.username + " is already certified!"});
  } else {
      res.render('upgradeRequest', {user: currentUser, sent: "Not Sent"});
  }
});

app.get('/adminhome', function (req, res) {
  if (currentUser.username == 'administrator') {
      res.render('adminDashboard', {user: currentUser});
  } else {
      res.render('differentDashboard', {user: currentUser});
  }
});

app.get('/accountchange', function (req, res) {

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

app.use('/myHospital', (req, res) => {
  res.render('myHospital', {user: currentUser, hospital: currentUser.hospitalArray});
});

app.use('/addStaff', (req, res) => {
  //status is 0 if not med acct, 1 if staff does not exist, 3 if hospital doesn't exist, 4 if staff is already in hospital    
  if (req.body.enterStaffUsernameAdd) {
      User.findOne( {username : req.body.enterStaffUsernameAdd}, (err, staff) => {
          if (err) {
              res.render('differentDashboard', {user : currentUser});
          } else if (!staff) {
              //staff member doesn't exist
              res.render('staffMemberError', {status: 1});
          } else {
              if (!staff.medicalAccount) {
                  //staff member isn't a doctor
                  res.render('staffMemberError', {status: 0});
              } else {
                  for (var i = 0; i < currentUser.hospitalArray.length; i++) {
                      if (currentUser.hospitalArray[i].name == req.body.enterHosptialNameAdd) {
                          if (!currentUser.hospitalArray[i].staffArray) {
                              currentUser.hospitalArray[i].staffArray = [];
                          }
                          for (var j = 0; j < currentUser.hospitalArray[i].staffArray.length; j++) {
                              if (currentUser.hospitalArray[i].staffArray[j].username == req.body.enterStaffUsernameAdd) {
                                  //Staff already in hospital
                                  res.render('staffMemberError', {status: 4});
                              }
                          }
                          //staff not already in hosptial
                          currentUser.hospitalArray.push(staff);
                          currentUser.hospitalArray.save( (err) => {
                             if (err) {
                              res.json({'status' : err});
                             } else {
                                 res.render('myHospital', {user: currentUser, hosptial: currentUser.hosptialArray});
                             }
                          });
                      }
                  }
                  res.render('staffMemberError', {status: 3});
              }
          }
      });
  } else {
      res.render('myHospital', {user: currentUser, hospital: currentUser.hospitalArray});
  }
});

app.use('/removeStaff', (req, res) => {
  //status 0: not doctor, status 1: not existing in hospital chosen, status 2: not in hospital, status 3: hosptial does not exist / not owned by user
  if(req.body.enterStaffUsernameRemove) {
      User.findOne( {username : req.body.enterStaffUsernameRemove}, (err, staff) => {
          if (err) {
              res.render('differentDashboard', {user : currentUser});
          } else if (!staff) {
              //account does not exist
              res.render('staffMemberError', {status: 1});
          } else {
              if (!staff.medicalAccount) {
                  //account is not doctor
                  res.render('staffMemberError', {status: 0});
              } else {
                  
                  for (var i = 0; i < currentUser.hospitalArray.length; i++) {
                      if (currentUser.hosptialArray[i].name == req.body.enterHospitalNameRemove) {
                          if (!currentUser.hospitalArray[i].staffArray) {
                              currentUser.hospitalArray[i].staffArray = [];
                          }
                          for (var j = 0; j < currentUser.hospitalArray[i].staffArray.length; j++ ) {
                              if (currentUser.hosptialArray[i].staffArray[j].username == req.body.enterStaffUsernameRemove) {
                                  currentUser.hosptialArray[i].staffArray.splice(j, 1);
                                  currentUser.hospitalArray[i].save( (err) => {
                                      if (err) {
                                          res.json({'status' : err});
                                     } else {
                                         res.render('myHospital', {user: currentUser, hosptial: currentUser.hospitalArray});
                                     }
                                  });
                              }
                          }
                          res.render('staffMemberError', {status: 2});
                      }
                  }
                  res.render('staffMemberError', {status: 3});
              }
          }
      });
  } else {
      res.render('myHospital', {user: currentUser, hospital: currentUser.hospitalArray});
  }
});

app.get('/myRequests', function (req, res) {
  MedicalRequest.find( (err, allRequests) => {
    if (err) {
        console.log(err);
        res.end();
    } else if (allRequests.length == 0) {
        res.render('myRequests', {user: currentUser, requests: null});
    } else {
        res.render('myRequests', {user: currentUser, requests: allRequests});
    }
  });
});


app.use('/public', express.static('public'));

app.use('/styles', express.static('styles'));

app.use('/', (req, res) => {res.redirect('/public/login.html');});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
