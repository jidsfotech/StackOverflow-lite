
var express = require('express');
var path = require('path');
var db = require('./db/stackOverflowLiteDataBase');
var bodyParser = require('body-parser');
var app = express()

app.use(express.static(path.join(__dirname,'/css')));
app.use(express.static(path.join(__dirname, '/js')));
app.use(express.static(path.join(__dirname, 'img')));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 3000);

//Route for the home page
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Route for the ask-question page
app.get('/postQuestion', function(req, res){
    res.sendFile(path.join(__dirname, 'postQuestion.html'));
});

//Route rout to get a question and it answeers 
app.get('/questionAndAnswers', function(req, res){
    res.sendFile(path.join(__dirname, 'questionAndAnswers.html'));
});

//Routes for the about page
app.get('/about', function(req, res){
    res.type('text/plain');
    res.send('about page');
});


//Route for the home page
app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

//API endpoint to Fetch all questions
app.get('/api/v1/questions', (req, res) =>{
    res.send({
        success:'True',
        message:'Questions retrived succesfully',
        question:db
    });
});



//custom 404 page
app.use(function(req, res){
    res.type('text/plain');
    res.status(404)
    res.send('404 error - Not found')
});

//customer 500 page
app.use(function(req, res){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 error    - server error');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.')
});