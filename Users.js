var mongoose = require('mongoose');

//This is gonna be something different depending on where the database is located. 
mongoose.connect('mongodb://localhost:27017/myDatabase');

var Schema = mongoose.Schema;
