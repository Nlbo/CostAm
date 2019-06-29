const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./configs/configs');
const path = require('path');


mongoose.connect(config.mongoUrl, {useNewUrlParser: true, useCreateIndex: true})
    .then(_ => {
        console.log('MongoDB has connected ...')
    })
    .catch(err => {
        console.log('Error MongoDB not connected ...')
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(require('cors')());

app.use(morgan('dev'));

app.use('/uploads', express.static('./_uploads'));
app.use(express.static(__dirname + '/../Project/dist/Project'));
const apartments = require('./routes/apartments'),
    houses = require('./routes/houses'),
    commercials = require('./routes/commercials'),
    businesses = require('./routes/businesses'),
    random = require('./routes/random'),
    newlyBuilds = require('./routes/newlyBuilds'),
    code = require('./routes/code'),
    lands = require('./routes/lands');


app.use('/api/apartments', apartments);
app.use('/api/houses', houses);
app.use('/api/businesses', businesses);
app.use('/api/commercials', commercials);
app.use('/api/lands', lands);
app.use('/api/newlyBuilds', newlyBuilds);
app.use('/api/random', random);
app.use('/api/codes', code);




app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../Project/dist/Project/index.html'));
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../Project/dist/Project/index.html'));
});
//--------------------------------------


app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    res.status(err.status).json({error: err.message})
});
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({error: err.message});
});



module.exports = app;
