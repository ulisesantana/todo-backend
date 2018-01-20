'use strict';

//install npm i-S express ...
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const path = require('path'); //node

const tasksApi = require('./tasks/tasks.router');

const server = express();

server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

// Configurating CORS (Cross-Origin Resource Sharing)
server.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'X-API-KEY, Origin, X-Requested-With, Content-Type,'+
        ' Accept, Access-Control-Request-Method' );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// Log requests to the console
server.use(morgan('dev'));
server.use('/', tasksApi);



module.exports = server;
