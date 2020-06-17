
const mongoose = require('mongoose');
const Joi = require('joi');

const Customers = mongoose.model('Customers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 5,
    },
    isGold:{
        type:Boolean,
        default:false,
    },
    phone:{
        type:Number,
        required: true,
        maxlength: 50,
        minlength: 5,
    },
}));

function validFun(req) {

    // valid
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold:Joi.boolean()
    };

    return Joi.validate(req.body, schema);

    //
}

exports.Customers = Customers;
exports.validFun = validFun;