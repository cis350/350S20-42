//this is the part that connects to the database through express
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var User = require('./User.js');

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
    if (req.body.username) {
        queryUser = {"username" : req.body.username};
        if (req.body.password) {
            queryUser = {"password" : req.body.password};
        } else {
            changeVisibility();
        }
    } else {
        changeVisibility();
    }
    
    User.find(queryUser, (err, users) => {
        if (err) {
            console.log('uh oh' + err);
            res.json({});
        } else if (users.length == 0) {
            res.json({});
        } else {
            var returnArray = [];
            users.forEach( (user) => {
                returnArray.push(user);
            });
            
            console.log('made it here');
            if (returnArray) {
                console.log('logged in');
                //changePage();
                res.render('differentDashboard', {user: returnArray});
            } else {
                console.log('failed');
                res.redirect('/public/login.html');
            }
        }
    });
});

/*function changePage() {
    window.redirect('/dashboard.html');
}

function changeVisibility() {
    window.redirect('/login.html');
    var errorText = document.getElementById('ifWrongLogin');
    errorText.setAttribute('style', 'visibility: visible');
}*/

app.get('/home', function (req, res) {
    res.redirect('differentDashboard.ejs');
});

app.get('/myHospital', function (req, res) {
    res.redirect('myHospital.ejs');
});

app.get('/logout', function (req, res) {
    res.redirect('../public/login.html');
});

app.use('/public', express.static('public'));

app.use('/', (req, res) => {res.redirect('/public/login.html');
                           console.log('here');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
