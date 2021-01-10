// importing express
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const keys = require('./keys/index');

// importing middlewares
const userMiddleware = require('./middleware/user');
const csrf = require('csurf');
const flash = require('connect-flash');
const session = require('express-session');
const fileMiddleware = require('./middleware/file');
const helmet = require('helmet');
const compression = require('compression');


// importing custom middlewares
const varMiddleware = require('./middleware/variables');
const errorHandler = require('./middleware/error');

// MongoDB setup
const MongoStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
});

// importing routes
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');


// creating express app/server
const app = express(); // creating server, analog of node server

// setting engine => handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs', // to set extension name of files
    helpers: require('./utils/hbs-helpers.js'), // creating hbs helpers
})

// initializing middlewares

// handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

// dirs settings
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));

// setting session
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}));

// other middlewares
app.use(fileMiddleware.single('avatar'));
app.use(csrf());
app.use(flash());
app.use(helmet({contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false}));
app.use(compression());
app.use(varMiddleware);
app.use(userMiddleware);

// routes middlewares
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use(errorHandler);

// configuring and starting server
const PORT = process.env.PORT || 3000;

async function start() {
    try {
        // connection to mongoDb
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();