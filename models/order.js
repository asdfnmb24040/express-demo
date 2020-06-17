
const mongoose = require('mongoose');
const Joi = require('joi');
const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 5,
    }
});
const Order = mongoose.model('Order', OrderSchema);

function validFun(req) {

    // valid
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(req.body, schema);
 
    //
}

exports.Order = Order;
exports.validFun = validFun;
exports.OrderSchema = OrderSchema;