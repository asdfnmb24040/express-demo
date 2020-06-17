const winston = require('winston');
// require('winston-mongodb');//會關閉整合測試(暫時關閉)
require('express-async-errors'); //自動返回伺服器錯誤

module.exports = function () {
    winston.handleExceptions( //最終版抓錯
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true
        }),
        new winston.transports.File({
            filename: 'uncaughtExceptions.log'
        })
    ); 

    process.on('unhandledRejection', (ex) => { //抓取Promise錯誤，並丟出Exception給winston.handleExceptions
        throw ex;
    });

    winston.add(winston.transports.File, {
        filename: 'logfile.log'
    });
    // winston.add(winston.transports.MongoDB, {//會關閉整合測試(暫時關閉)
    //     db: 'mongodb://localhost/order',
    //     // level:'info',//info等級以上的都會被存進去
    // });
};

//抓錯誤(global)
// process.on('uncaughtException',(ex)=>{//抓取未定義錯誤，只限同步
//     console.log('WE GOT AN UNCAUGHT EXCEPTION');
//     winston.error(ex.message,ex);
//     process.exit(1);
// });  

// winston.handleExceptions(//最終版抓錯
//     new winston.transports.File({
//         filename: 'uncaughtExceptions.log'
//     })
// );

//  throw new Error('something fail during startup');//產生sync錯誤

// process.on('unhandledRejection',(ex)=>{//抓取Promise錯誤
//     console.log('WE GOT AN unhandled Rejection');
//     winston.error(ex.message,ex);
//     process.exit(1);
// }); 

// process.on('unhandledRejection', (ex) => { //抓取Promise錯誤，並丟出Exception給winston.handleExceptions
//     throw ex;
// });

//產生async錯誤
//  const fakeErr = Promise.reject( new Error('something fail during promise'));
//  fakeErr.then(()=>console.log('done'));

//存log套件
// winston.add(winston.transports.File, {
//     filename: 'logfile.log'
// });
// winston.add(winston.transports.MongoDB, {
//     db: 'mongodb://localhost/order',
//     // level:'info',//info等級以上的都會被存進去
// });