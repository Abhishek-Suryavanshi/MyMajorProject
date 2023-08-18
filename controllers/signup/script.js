const User = require('../../models/Users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getSignup = (req, res, next) => {
    res.render('signup', {
        msg: req.flash('msg')
    });
};

module.exports.postSignup = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            req.flash('msg', 'User is already Present');
            return res.redirect('/signup');
        }
        bcrypt.genSalt(saltRounds, async function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                await User.create({
                    username,
                    password: hash
                });
                req.flash('msg', "SignUp Success");
                res.redirect('/login');
            });
        });

    }
    catch (err) {
        next(err);
    }
};