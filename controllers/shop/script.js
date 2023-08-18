const Products = require("../../models/Products");

module.exports.getProfile = (req, res, next) => {
    res.render('profile', {
        name: req.user.username,
        isAdmin: req.user.isAdmin,
        cartCount: req.user.cart.length
    });
};

module.exports.getProducts = async (req, res, next) => {
    try {
        let products = await Products.find({});
        res.render('shop/products', {
            products,
            isAdmin: req.user.isAdmin,
            cartCount: req.user.cart.length
        })
    }
    catch (err) {
        return next(err);
    }
}

module.exports.getAddToCart = async (req, res, next) => {
    try {
        const { productId } = req.query;
        let index = -1;
        req.user.cart.forEach((product, indx) => {
            if (product.id == productId) {
                index = indx;
            }
        })

        if (index == -1) {
            req.user.cart.unshift({
                id: productId,
                quantity: 1
            })
        }
        else {
            req.user.cart[index].quantity += 1;
        }

        await req.user.save();

        res.send({
            msg: "Item Added Successfully",
            cartCount: req.user.cart.length
        });
    }
    catch (err) {
        return next(err);
    }
}