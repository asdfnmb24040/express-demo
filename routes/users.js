const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
    Users,
    validFun
} = require('../models/users');

const _ = require('lodash'); //超好用套件
const bcrypt = require('bcrypt');//輔助加密

const auth = require('../middleware/auth');//加入中繼

router.get('/me',auth,async(req,res)=>{
    const user = await Users.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {

    const {
        error
    } = validFun(req);
    if (error) return res.status(400).send(error.details[0].message);
    //
    // let user = new Users({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // }); 

    let user = new Users(_.pick(req.body, ['name', 'email', 'password']));

    let userIsExist = await Users.findOne({
        email: user.email
    });
    if (userIsExist) {
        res.status(404).send('user already exist');
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user = await user.save();
        // res.send(_.pick(user,['_id','name','email']));//超好用套件
        //const token = jwt.sign({_id:user._id},config.get('jwtPrivateKey'));//已被收好

        const token = await user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    } catch (error) {
        res.status(404).send(error.message);
    }
});


module.exports = router;