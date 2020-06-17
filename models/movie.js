//require
const mongoose = require('mongoose');
const Joi = require('joi');
const {OrderSchema} = require('../models/order');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        minlength:5,
        maxlength:255,
        required:true,
        trim:true,
    },
    order:{
        type:OrderSchema,
        required:true,
    },
    numberInStock: {
        type:Number,
        required:true,
        min:0,
        max:255,
    },
    dailyRentalRate: {
        type:Number,
        required:true,
        min:0,
        max:255,
    },
}));

function validFun(req) {

    // valid
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        orderId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
    };

    return Joi.validate(req.body, schema);

    //
}

exports.Movie = Movie;
exports.validFun = validFun;
exports.OrderSchema = OrderSchema;