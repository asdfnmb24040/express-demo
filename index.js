const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();//抓錯誤(global)
require('./startup/db')();//連接db
require('./startup/routes')(app,express);//引入router
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`正在聆聽port ${port}`)); 

 module.exports = server;