const express = require('express');
const router = express.Router();
const Joi = require('joi');

const {Customers,validFun} = require('../models/customer');

router.get('/', async (req, res) => {
    let customers = await Customers.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {

    const { error} = validFun(req);
    if (error) return res.status(400).send(error.details[0].message);
    //
    let customers = new Customers({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });
    try {
        customers = await customers.save();
        res.send(customers);
    } catch (error) {
        res.status(400).send('error====>',error.message);
    }
});

router.put('/:id', async (req, res) => {
    const { error} = validFun(req);
    if (error) return res.status(400).send(error.details[0].message);

    const customers = await Customers.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    },{new:true});

    if (!customers) return res.status(404).send('no data');

    res.send(customers);
});

router.delete('/:id', async (req, res) => {
    const customers = await Customers.findByIdAndRemove(req.params.id);

    if (!customers) return res.status(404).send('no data');

    res.send(customers);
});

module.exports = router;

