const users = require('../routes/users');
const auth = require('../routes/auth');
const rentals = require('../routes/rentals');
const movie = require('../routes/movie');
const order = require('../routes/order');
const customers = require('../routes/customers');
const home = require('../routes/home');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../middleware/logger');
const err = require('../middleware/err');

// middleware fun
module.exports = function (app, express) {
    //#region third-party Middleware 
    app.use(helmet());
    app.use(morgan('tiny')); //speed 

    app.use(express.json()); //使可用post body raw json
    app.use(express.urlencoded({ //使可用form-urlencoded
        extended: true
    }));
    app.use(express.static('public')); //http://localhost:3000/readme.txt

    //logger
    app.use(logger);

    app.use((req, res, next) => {
        console.log('authenticating..');
        next();
    });

    // pug
    app.set('view engine', 'pug');
    app.set('views', '../views'); //overwrite

    // app.get('/', (req, res) => {
    //     res.render('index',{title: 'im title',name:'im name'});
    // });

    //// debug
    // const startupDebugger = require('debug')('app:startup');
    // const dbDebugger = require('debug')('app:db');

    //$env:DEBUG="app:startup,app:db"
    //$env:DEBUG=

    // if (app.get('env') === 'development') {
    //     app.use(morgan('tiny'));
    //     startupDebugger('Morgan enable..');
    // }

    // dbDebugger('db init..');

    //#endregion

    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/rentals', rentals);
    app.use('/api/customers', customers);
    app.use('/api/movie', movie);
    app.use('/api/order', order);
    app.use('/', home);
    app.use(err); //err middleware need to be here
};