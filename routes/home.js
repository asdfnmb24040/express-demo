const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index',{title: 'im title',name:'im name'});
});

module.exports = router;

