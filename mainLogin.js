//this is the part that connects to the database through express
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var User = require('./User.js');

var currentUser = null;

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
            console.log('created this bitch' + newPerson.username + ' ' + newPerson.password);           
        }
    });
});

app.use('/checkLogin', (req, res) => {
    var queryUser = {};
    if (req.body.username && req.body.password) {
        queryUser = {"username" : req.body.username, 
                    "password" : req.body.password};
    } else {
        res.redirect('/');
    } 
    
    User.find(queryUser, (err, users) => {
        if (err) {
            console.log('uh oh' + err);
            res.json({});
        } else if (users.length == 0) {
            res.redirect('/');
        } else {
            var returnArray = [];
            users.forEach( (user) => {
                returnArray.push(user);
            });
            
            if (returnArray) {
                currentUser = returnArray[0];
                res.render('differentDashboard', {user: returnArray});
            } else {
                res.redirect('/');
            }
        }
    });
});

app.get('/home', function (req, res) {
    res.render('differentDashboard', {user: currentUser});
});

app.get('/myHospital', function (req, res) {
    res.render('myHospital', {user: currentUser});
});

app.use('/public', express.static('public'));

app.use('/styles', express.static('styles'));

app.use('/', (req, res) => {res.redirect('/public/login.html');});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
