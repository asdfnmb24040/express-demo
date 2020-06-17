const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAK ERROR: jwtPrivateKey is not define');//stack trace
    }
};



////控制環境 
//$env:NODE_ENV="development"
//$env:NODE_ENV="production"
//$env:app_password="1345"  

// process.env.NODE_ENV = 'production';
// app.set('env','production');
// app.set('app_password','12345')
//

////configuration 
// const config = require('config');
// console.log(`app name:${config.get('name')}`);
// console.log(`mail host: ${config.get('mail.host')}`);
// // console.log(`mail password:${config.get('mail.password')}`);
// if (config.has('mail.password')) {

//     console.log(`Mail password is: ${config.get('mail.password')}`);
// }
////

////environments
// console.log(`NODE_ENV:${process.env.NODE_ENV}`);
// console.log(`app:${app.get('env')}`);

// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     console.log('Morgan enable..');
// }
////