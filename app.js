const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('./auth/passport');
const hbs = require('hbs');
const multer = require('multer');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

app.use(flash());

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         console.log(path.extname(file.originalname));
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
//     }
// });

const upload = multer({});
app.use(upload.single('image'));

const blockHelper = require('./functions/blockHelpers');

blockHelper.pagination;

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');
app.use(methodOverride('_method'));

require('dotenv').config()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
    // console.log(req.user._id);
    if (req.user) return res.redirect('/shop/profile');
    return res.redirect('/main');
});

app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

const ifNotLoggedIn = require('./middlewares/checkedLoggedIn');
app.use('/signup', ifNotLoggedIn, require('./routes/signup'));
app.use('/login', ifNotLoggedIn, require('./routes/login'));

const isLoggedIn = require('./middlewares/isLoggedIn');
app.use('/admin', isLoggedIn, require('./routes/admin'));
app.use('/shop', isLoggedIn, require('./routes/shop'));

app.use('/main', require('./routes/main'));
app.use('/payment', require('./routes/payment'));

app.get('*', (req, res) => {
    res.render('error');
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })