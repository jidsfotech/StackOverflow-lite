
var express = require('express');
var path = require('path');
var db = require('./db/stackOverflowLiteDataBase');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express()

app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/js')));
app.use(express.static(path.join(__dirname, 'img')));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

//Route for the home page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Route for the ask-question page
app.get('/postQuestion', function (req, res) {
    res.sendFile(path.join(__dirname, 'postQuestion.html'));
});

//Route rout to get a question and it answeers 
app.get('/questionAndAnswers', function (req, res) {
    res.sendFile(path.join(__dirname, 'questionAndAnswers.html'));
});

//Routes for the about page
app.get('/about', function (req, res) {
    res.type('text/plain');
    res.send('about page');
});


//Route for the home page
app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//API endpoint to Fetch all questions
app.get('/api/v1/questions', (req, res) => {
    res.send({
        success: 'True',
        message: 'Questions retrived succesfully',
        data: db
    });
});

//API endpoint to Fetch a specific question
app.get('/api/v2/questions/:id', (req, res) => {
    var serialize_id = req.params.id.replace(/[^a-z0-9]/g, '')
    const questionId = "question_0" + serialize_id;
    res.send({
        success: 'True',
        message: 'Question retrived succesfully',
        data: db[questionId]
    });
});

//API endpoint to Add a question
app.post('/api/v3/questions', (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            success: "false",
            message: "provide title for your question"
        })
    } else if (!req.body.questionSummary) {
        res.status(400),
            res.send({
                success: "false",
                message: "please summarise your question"
            })
    } else {
        var dbsize = Object.keys(db).length + 1;
        var id = "question_0" + dbsize;
        var question = {
            "question_Id": id,
            "questionTitle": req.body.title,
            "questionBody": req.body.questionSummary,
            "tags": req.body.tags,
            "Author": req.body.Author,
            "questionActivities": req.body.questionActivities,
            "answers": req.body.answers
        };

        //Object.assign(db.questions, {[id]:question});
        db[id] = question;
        res.status(200).send(db);
        fs.writeFile('./db/stackOverflowLiteDataBase.json', JSON.stringify(db));
    }
});

//API endpoint to Add answer to a question
app.post('/api/v4/questions/:id/answers', (req, res) => {
    if (!req.body.answer) {
        res.status(400).send({
            message: "false",
            success: "provide an answer"
        });
    } else {
        var serialize_id = req.params.id.replace(/[^a-z0-9]/g, '')
        const id = "question_0" + serialize_id;
        var userId = "answeredBy_" + "jidsmotha";
        var answerProvided = req.body.answer;
        db[id]['answers'][userId] = answerProvided;
        res.status(200).send(answerProvided);
        fs.writeFile('./db/stackOverflowLiteDataBase.json', JSON.stringify(db));
    }
});

//custom 404 page
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404)
    res.send('404 error - Not found')
});

//customer 500 page
app.use(function (req, res) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 error    - server error');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.')
});