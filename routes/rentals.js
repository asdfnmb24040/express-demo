 const express = require('express');
 const router = express.Router();
 const mongoose = require('mongoose');
const Joi = require('joi');
const {
    Rentals,
    validFun
} = require('../models/rentals');
const {
    Movie
} = require('../models/movie');
const {
    Customers
} = require('../models/customer');
const Fawn = require('fawn');

Fawn.init(mongoose); //初始化Fawn

router.get('/', async (req, res) => {
    let rentals = await Rentals.find();
    res.send(rentals);
});

router.post('/', async (req, res) => {

    const {
        error
    } = validFun(req);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findById(req.body.customerId);
    if (!customer) {
        res.status(400).send('cant find the customer');
    }

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
        res.status(400).send('cant find the movie');
    }

    if (movie.numberInStock === 0) return res.status(400).send('the movie.numberInStock = 0');

    //
    let rentals = new Rentals({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.phone,
        }
    });

    //如何確保同時儲存或是兩個都不儲存
    //google mongodb perform two phase commits
    //套件 => fawn
    try {
        new Fawn.Task()
            .save('rentals', rentals)
            .update('movies', {
                _id: movie._id
            }, { 
                $inc: {
                    numberInStock: -1
                }
            })
            .run();
        res.send(rentals);
    } catch (error) {
        res.status(400).send('error====>', error.message);
    }
});

// router.put('/:id', async (req, res) => {
//     const {
//         error
//     } = validFun(req);
//     if (error) return res.status(400).send(error.details[0].message);

//     const order = await Order.findById(req.body.orderId);
//     if (!order) {
//         res.status(400).send('cant find the orderId');
//     }

//     const rentals = await Rentals.findByIdAndUpdate(req.params.id, {
//         title: req.body.title,
//         order: order,
//         numberInStock: req.body.numberInStock,
//         dailyRentalRate: req.body.dailyRentalRate,
//     }, {
//         new: true
//     });

//     if (!rentals) return res.status(404).send('no data');

//     res.send(rentals);
// });

// router.delete('/:id', async (req, res) => {
//     const rentals = await Rentals.findByIdAndRemove(req.params.id);

//     if (!rentals) return res.status(404).send('no data');

//     res.send(rentals);
// });

module.exports = router;