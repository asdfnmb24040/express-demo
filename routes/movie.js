const express = require('express');
const router = express.Router();
const {Order} = require('../models/order');
const {Movie,validFun} = require('../models/movie');

router.get('/', async (req, res) => {
    let movie = await Movie.find();
    res.send(movie);
});

router.post('/', async (req, res) => {

    const { error} = validFun(req);
    if (error) return res.status(400).send(error.details[0].message);

    const order = await Order.findById(req.body.orderId); 
    if(!order){
        res.status(400).send('cant find the orderId');
    }
    //
    let movie = new Movie({
        title: req.body.title,
        order: order,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        
    });
    try {
        // movie = await movie.save();
        await movie.save();
        res.send(movie);
    } catch (error) {
        res.status(400).send('error====>',error.message);
    }
});

router.put('/:id', async (req, res) => {
    const { error} = validFun(req);
    if (error) return res.status(400).send(error.details[0].message);

    const order = await Order.findById(req.body.orderId); 
    if(!order){
        res.status(400).send('cant find the orderId');
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        order: order,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    },{new:true});

    if (!movie) return res.status(404).send('no data');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('no data');

    res.send(movie);
});

module.exports = router;

