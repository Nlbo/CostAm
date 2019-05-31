const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./configs/configs');


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


const apartments = require('./routes/apartments'),
    houses = require('./routes/houses'),
    commercials = require('./routes/commercials');


app.use('/api/apartments', apartments);
app.use('/api/houses', houses);
app.use('/api/commercials', commercials);


module.exports = app;
