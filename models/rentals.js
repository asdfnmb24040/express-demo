//require
const mongoose = require('mongoose');
// const Joi = require('joi');
// //npm i joi-objectid
// Joi.objectId = require('joi-objectid')(Joi);//檢核id

const Rentals = mongoose.model('Rentals', new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                maxlength: 50,
                minlength: 5,
            },
            phone:{
                type:Number,
                required: true,
                maxlength: 50,
                minlength: 5,
            },
        }),
        required:true,
    },
    movie:{
        type: new mongoose.Schema({
            title: {
                type: String,
                minlength:5,
                maxlength:255,
                required:true,
                trim:true,
            },
            dailyRentalRate: {
                type:Number,
                required:true,
                min:0,
                max:255,
            },
        }),
        required:true,
    },
    dateOut:{
        type:Date,
        default:Date.now,
        required:true,
    },
    dateReturned:{
        type:Date,
    },
    rentalFee:{
        type:Number,
        min:0
    }
    
}));

function validFun(req) {

    // valid
    const schema = {
        customerId:Joi.objectId().required(),//檢核id
        movieId:Joi.objectId().required(),//檢核id
    };

    return Joi.validate(req.body, schema);

    //
}

exports.Rentals = Rentals;
exports.validFun = validFun;