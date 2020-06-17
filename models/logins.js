const mongoose = require('mongoose');
const Joi = require('joi');

const Logins = mongoose.model('Logins', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    }
}));

function validFun(req) {

    // valid
    const schema = {
        name: Joi.string().min(5).max(10).required(),
        email:  Joi.string().min(5).max(50).required(),
        password:  Joi.string().min(5).max(10).required(),
        //npm i joi-password-complexity 好用套件
    };

    return Joi.validate(req.body, schema);

    //
}

exports.Users = Users;
exports.validFun = validFun;