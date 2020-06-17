const winston = require('winston');

module.exports = function(err,req,res,next){
    //log the ex

    //error
    //warn
    //info
    //verbose
    //debug
    //silly
    winston.error(err.message,err);

    res.status(400).send(err.message);
};