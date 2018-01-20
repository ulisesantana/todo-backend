'use strict';

const mongoose = require('mongoose');
const server = require('./server');
const port = process.env.PORT || 5000;
const config = require('./config');

// Fix mpromise mongoose deprecated warning
mongoose.Promise = global.Promise;

mongoose.connect(config.dbAccess, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Conexión a MongoDB correcta.');
        server.listen(port,function(){
            console.log(`API REST funcionando en http://localhost:${port}`); //template string
        });
    }
});
