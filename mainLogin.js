//this is the part that connects to the database through express
//var express = require('express');
//var app = express();

//var User = require('./User.js');

//app.use('')

function loginButtonClick() {
    
    //var username = document.getElementById('enterUsername').getAttribute('value');
    //var password = document.getElementById('enterPassword').getAttribute('value');
    
    //so we need to check if they're in the database and if they are it needs to point to the dashboard. 
    window.location.href='/dashboard.html';
    return false;
    
    //if they're not they need to point to the same form but needs to add another element to the mix -> change the visibility of ifWrongLogin to visible. 
    
}