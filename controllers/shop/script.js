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
        let products = await Products.find({}).limit(3);
        // let limit = 3;
        // // console.log(products.length);

        // // let x = products.length / 3;
        // let remaining = products.length % limit;
        // // console.log(products.length-remaining);
        // let no_of_pages = (products.length - remaining) / limit;  // 3, remaining vale products vala page hatke 3 page hai

        // let offset = [];

        // let temp = 0;
        // for (let i = 0; i < no_of_pages + 1; i += 1) {   //Agar last page m jo page hai jo limit se kam hai to sare utha lega
        //     if (i == 0) {
        //         offset.push(temp)
        //     }
        //     else {
        //         temp += limit;
        //         offset.push(temp);
        //     }
        // }

        // console.log(offset);  //offset agaya ab 

        res.render('shop/products', {
            products,
            isAdmin: req.user.isAdmin,
            cartCount: req.user.cart.length,
            // offset,
            // limit
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

module.exports.getCart = async (req, res, next) => {
    let user = await req.user.populate('cart.id');
    let userCart = user.cart;
    res.render('shop/cart', {
        products: userCart,
        isAdmin: req.user.isAdmin,
        cartCount: req.user.cart.length
    })
};

module.exports.getProductList = async (req, res, next) => {
    try {
        const { limit, offset } = req.query;
        let products = await Products.find({}).skip(offset).limit(limit);
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

module.exports.getShop = async (req, res, next) => {
    try {
        let products = await Products.find({});
        res.render('shop/shop', {
            products,
            isAdmin: req.user.isAdmin,
            cartCount: req.user.cart.length
        })
    }
    catch (err) {
        return next(err);
    }
}