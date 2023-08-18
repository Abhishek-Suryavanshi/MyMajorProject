const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/Users');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            let user = await User.findOne({ username });
            if (!user) { return done(null, false); }
            bcrypt.compare(password, user.password).then(function (result) {
                if (result == false) { return done(null, false); }
                return done(null, user);
            });
        }
        catch (err) {
            if (err) { return done(err); }
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(null, false);
        })
});

module.exports = passport;