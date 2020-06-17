function log (req,res,next) { //this is middleware fun
    console.log('logging..');
    next(); // important. means pass to the next middleware fun
}

module.exports = log;