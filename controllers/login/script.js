module.exports.getLogin = (req, res, next) => {
    if (req.user) return redirect('/shop/profile');
    res.render('login', {
        msg: req.flash('msg')
    })
};