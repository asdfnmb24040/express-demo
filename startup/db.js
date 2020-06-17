const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config')

module.exports = function () {
    //連接
    const db = config.get('db');

    console.log('connect to =>>',db);
    
    mongoose.connect(db)
        .then(() => winston.info(`connect to ${db}...`));
    // .catch給index.js抓
};

