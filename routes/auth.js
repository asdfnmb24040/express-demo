const express = require('express');
const router = express.Router();
const Joi = require('joi');

const _ = require('lodash'); //超好用套件
const bcrypt = require('bcrypt');

const auth = require('../middleware/auth');

const {
    Users,
    validFunForLogin
} = require('../models/users');

router.post('/',auth, async (req, res) => {
    //目前實驗x-auth-token驗證只有再private直接設定時才通過，呼叫config.get('jwtPrivateKey')時不會過3

    const {
        error
    } = validFunForLogin(req);
    if (error) return res.status(400).send(error.details[0].message);

    try {

        const user = await Users.findOne({
            email: req.body.email,
        });
        if (!user) res.status(400).send('account or email is Invalid');

        //hash 比較密碼
        const pswCompare = await bcrypt.compare(req.body.password, user.password);

        if (!pswCompare) res.status(400).send('account or email is Invalid');
        
        const token = user.generateAuthToken();

        res.send(token);
    } catch (err) {
        res.status(400).send('error====>', err.message);
    }
});

module.exports = router;