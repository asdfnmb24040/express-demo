const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
    Order,
    validFun
} = require('../models/order');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validObjectId = require('../middleware/validObjectId');

const asyncMiddleWare = require('../middleware/async'); //將try catch外包
//#region api

//router.get('/getOrderById/:id',auth, asyncMiddleWare(async (req, res) => {//將try catch外包

router.get('/getOrderById/:id', auth, async (req, res) => {
    //再物件陣列中尋找
    let order = await Order.findById(parseInt(req.params.id));

    if (!order) res.status(404).send('the order was not found');
    else res.send(order);
});

router.get('/', async (req, res) => {

    let orders = await Order.find().sort('name');
    res.send(orders);
});

router.get('/:id', [auth,validObjectId], async (req, res) => {

    // throw new Error('fake err');
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('no data');

    res.send(order);
});

router.post('/',[auth], async (req, res) => {

    // valid
    const {
        error
    } = validFun(req);
    
    if (error) return res.status(400).send(error.details[0].message);
    //
    let order = new Order({
        name: req.body.name
    });
    try {
        order = await order.save();
        res.send(order);
    } catch (error) {
        res.status(400).send('error====>', error.message);
    }
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validFun(req);
    if (error) return res.status(400).send(error.details[0].message);

    const order = await Order.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, {
        new: true
    });

    if (!order) return res.status(404).send('no data');

    res.send(order);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const order = await Order.findByIdAndRemove(req.params.id);

    if (!order) return res.status(404).send('no data');

    res.send(order);
});


//#endregion

module.exports = router;