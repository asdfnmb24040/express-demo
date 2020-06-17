const mongoose = require('mongoose');
const Joi = require('joi');

const jwt = require('jsonwebtoken');
const config = require('config');//get private key

const userSchema =  new mongoose.Schema({
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
        maxlength: 255
    },
    isAdmin:{
        type:Boolean,
    }
});
userSchema.methods.generateAuthToken = function () {
    console.log(config.get('jwtPrivateKey')) ;
    return jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
};

const Users = mongoose.model('Users',userSchema);

function validFun(req) {

    // valid
    const schema = {
        name: Joi.string().min(5).max(10).required(),
        email:  Joi.string().min(5).max(50).required(),
        password:  Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(req.body, schema);

    //
}

function validFunForLogin(req) {

    // valid
    const schema = {
        email:  Joi.string().min(5).max(50).required(),
        password:  Joi.string().min(5).max(10).required(),
    };

    return Joi.validate(req.body, schema);

    //
}

exports.Users = Users;
exports.validFun = validFun;
exports.validFunForLogin = validFunForLogin;