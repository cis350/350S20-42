//this is the part that connects to the database through express
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var User = require('./User.js');

var currentUser = null;

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
                res.render('differentDashboard', {user: user});
            }
        });
    } else {
        res.redirect('/');
    } 
    
    
});

app.get('/home', function (req, res) {
    res.render('differentDashboard', {user: currentUser});
});

app.use('/myHospital', (req, res) => {
    res.render('myHospital', {user: currentUser, staff: currentUser.staffArray});
});

app.use('/addStaff', (req, res) => {
    //status is 0 if not med acct, 1 if staff does not exist
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
                    if (!currentUser.staffArray) {
                        currentUser.staffArray = [];
                    }
                    currentUser.staffArray.push(staff);
                    currentUser.save( (err) => {
                       if (err) {
                           res.json({'status' : err});
                       } else {
                           res.render('myHospital', {user: currentUser, staff: currentUser.staffArray});
                       }
                    });
                    
                }
            }
        });
    } else {
        res.render('myHospital', {user: currentUser, staff: currentUser.staffArray});
    }
});

app.use('/removeStaff', (req, res) => {
    //status 0: not doctor, status 1: not existing, status 2: not in hospital
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
                    var index = -1;
                    for (var i = 0; i < currentUser.staffArray.length; i++) {
                        if (staff.username == currentUser.staffArray[i].username) {
                            index = i;
                        }
                    }

                    if (index < 0) {
                        //account is not in hospital
                        res.render('staffMemberError', {status: 2});
                    } else {
                        //remove and save
                        currentUser.staffArray.splice(index, 1);
                        currentUser.save( (err) => {
                           if (err) {
                                res.json({'status' : err});
                           } else {
                               res.render('myHospital', {user: currentUser, staff: currentUser.staffArray});
                           }
                       });
                    }
                }
            }
        });
    } else {
        res.render('myHospital', {user: currentUser, staff: currentUser.staffArray});
    }
});

app.use('/public', express.static('public'));

app.use('/styles', express.static('styles'));

app.use('/', (req, res) => {res.redirect('/public/login.html');});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
