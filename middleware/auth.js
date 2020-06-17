const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No Token provided.');
    
    try {
        console.log(config.get('jwtPrivateKey')) ;

        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next(); //pass control to next middlewave function
    } catch (ex) {
        res.status(400).send('Invalid token'); //end api
    }
};