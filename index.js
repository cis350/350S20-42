var express = require('express');
var app = express();
var fs = require('fs');

// This is the definition of the Person class -- DO NOT CHANGE IT!
/*class Person {
    constructor(id, status, date) {
        this.id = id;
        this.status = status;
        this.date = date;
    }
}

// This is the map of IDs to Person objects -- DO NOT CHANGE IT!
var people = new Map();
people.set('1234', new Person('1234', 'safe', new Date().getTime()));
people.set('5678', new Person('5678', 'missing', new Date().getTime()));
people.set('1111', new Person('1111', 'safe', new Date().getTime()));
people.set('4321', new Person('4321', 'deceased', new Date().getTime()));
people.set('5555', new Person('5555', 'hospitalized', new Date().getTime()));
people.set('3500', new Person('3500', 'safe', new Date().getTime()));

// This is the '/test' endpoint that you can use to check that this works
// Do not change this, as you will want to use it to check the test code in Part 2
app.use('/test', (req, res) => {
    // create a JSON object
    var data = { 'message' : 'It works!' };
    // send it back
    res.json(data);
});

// This is the endpoint you need to implement in Part 1 of this assignment
app.use('/get', (req, res) => {
    var personJson = []
    if (!req || !req.query || !req.query.id) {
        res.json([]);
    } else if (Array.isArray(req.query.id)) {
        var i;
        for (i = 0; i < req.query.id.length; i++) {
            personJson.push(getPerson(req.query.id[i]));
        }
    } else {
        personJson.push(getPerson(req.query.id));
    }
    res.json(personJson);


});

function getPerson(id){
    if (!people.get(id)) {
        var personJson = ({'id': id, 'status': 'unknown', date: new Date().getTime()})
        return personJson;
    } else {
        var person = people.get(id);
        var personJson = ({'id' : id, 'status' : person.status,
           'date' : person.date});
        return personJson;    
    }
}

// -------------------------------------------------------------------------
// DO NOT CHANGE ANYTHING BELOW HERE!

// This endpoint allows a caller to add data to the Map of Person objects
// You do not need to do anything with this code; it is only provided
// as an example but will also be used for grading your code
app.use('/set', (req, res) => {
    // read id and status from query parameters
    var id = req.query.id;
    var status = req.query.status;
    // create new Person object
    var person = new Person(id, status, new Date().getTime());
    // add it to Map
    people.set(id, person);
    // send it back to caller
    res.json(person);
});
*/
// This just sends back a message for any URL path not covered above
app.use('/a', (req, res) => {
    res.send('Default message.');
});

// This starts the web server on port 3000. 
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

/////

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alluser:alluser@350s20-42mongodb-pvpes.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


var Person = require('./Person.js');

app.use('/create', (req, res) => {
var newPerson = new Person ({
 // defined in Person.js
 username: req.query.username,
 password: req.query.password,
});
newPerson.save( (err) => {
         if (err) {
          res.json( { 'status' : err } );         }
             else {
                   res.json( { 'status' :'success' } );   } });});

app.use('/all', (req, res) => {
    Person.find( (err, allPeople) => {
        if (err) {   res.json( { 'status' : err } );}
        else if (allPeople.length == 0) {
           res.json( { 'status' : 'no people' } );}
           else {
              res.json(allPeople );}});});


app.use('/updatePassword', (req, res) => {
    var updateName = req.query.username;
    var oldPassword = req.query.oldPassword;
    Person.findOne(
     { username: updateName, password : oldPassword },
      (err, person) => {
        if (err) {
            res.json( { 'status' : err } );
        }
        else if (!person) {
           res.json( { 'status' : 'no person' } );
       }else {
        person.password = req.query.newPassword;
        person.save( (err) => {
         if (err) {    res.json( { 'status' : err } );
        }else {
           res.json( { 'status' : 'success' } );}});}});});


app.use('/loginPerson', (req, res) => {
    var searchName = req.query.username;
    var searchPassword = req.query.password;
    Person.findOne( { username: searchName, password: searchPassword }, 
        (err, person) => {
        if (err) {    
            res.json( { 'status' : err } );
        }else if (!person) {   res.json( { 'status' : 'no person' } );
    }else { 
       res.json( { 'status' : 'success'  ,'person' : person } );}});});

app.use('/addImage', (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    var imgPath = req.query.imgPath;
    Person.findOne( { username: username, password: password }, 
        (err, person) => {
        if (err) {    
            res.json( { 'status' : err } );
        }else if (!person) {   res.json( { 'status' : 'no person' } );
    }else { 
       person.img.data = fs.readFileSync(imgPath);
       person.img.contentType = 'image/png';
       person.save( (err) => {
         if (err) {    res.json( { 'status' : err } );
        }else {
           res.json( { 'status' : 'success' } );}});
       }});});

app.use('/addVaccine', (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    var vId = req.query.vId;
    var vDate = Date.parse(req.query.date);
    var hospitalId = req.query.hId;
    Person.findOne( { username: username, password: password }, 
        (err, person) => {
        if (err) {    
            res.json( { 'status' : err } );
        }else if (!person) {   res.json( { 'status' : 'no person' } );
    }else { 
       person.img.data = fs.readFileSync(imgPath);
       person.img.contentType = 'image/png';
       person.save( (err) => {
         if (err) {    res.json( { 'status' : err } );
        }else {
           res.json( { 'status' : 'success' } );}});
       }});});

