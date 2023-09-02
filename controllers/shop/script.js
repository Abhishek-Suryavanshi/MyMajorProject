const Products = require("../../models/Products");
const User = require('../../models/Users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getProfile = (req, res, next) => {
    // console.log(req.user);
    // req.user.contactno = 999999;
    // await req.user.save();
    // console.log(req.user);
    // console.log(req.user.cart);
    res.render('profile', {
        name: req.user.username,
        isAdmin: req.user.isAdmin,
        cartCount: req.user.cart.length,
        email: req.user.email,
        contact: req.user.contact,
        paymentStatus: req.flash('payment')
    });
};

module.exports.getProducts = async (req, res, next) => {
    try {
        let products = await Products.find({}).limit(4);
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
        });
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
    // console.log(userCart);
    res.render('shop/cart', {
        products: userCart,
        isAdmin: req.user.isAdmin,
        cartCount: req.user.cart.length,
        name: req.user.username,
        email: req.user.email,
        contact: req.user.contact
    });
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

module.exports.postReduceItem = async (req, res, next) => {
    const { productId } = req.body;
    // console.log(productId);
    try {
        // console.log(req.user.cart);
        let user = await req.user.populate('cart.id');
        let userCart = user.cart;
        // let userCart = req.user.cart;
        // console.log(userCart);
        userCart.forEach((product) => {
            if (product._id == productId) {
                if (product.quantity >= 1) {
                    product.quantity -= 1;
                }
                if (product.quantity == 0) {
                    let newUserCart = userCart.filter((p) => {
                        if (p._id != productId) {
                            return true;
                        }
                        return false;
                    });
                    // console.log(newUserCart);
                    req.user.cart = newUserCart;
                }
            }
        })
        // console.log(req.user.cart.length);
        await req.user.save();

        // console.log(req.user.cart);
        res.send(req.user.cart);
        // let cartProducts = req.user.cart.map(async (product) => {
        //     try {
        //         return await Products.findById(product.id);
        //     }
        //     catch (err) {
        //         console.log(err);
        //     }
        // });

        // Promise.all(cartProducts)
        //     .then((cartProducts) => {
        //         res.send(cartProducts);
        //     })
        //     .catch((err) => {
        //         return next(err);
        //     })
        // res.send(cartProducts);

        // res.send("OK");
    }
    catch (err) {
        return next(err);
    }
    // res.send("OK");
}

module.exports.getUpdateProfile = (req, res, next) => {
    // console.log(req.user);
    // res.send("OK");
    res.render('updateprofile', {
        name: req.user.username,
        isAdmin: req.user.isAdmin,
        cartCount: req.user.cart.length,
        email: req.user.email,
        contact: req.user.contact,
        fakeusermsg: req.flash('fakeuser')
    });
}

module.exports.putUpdateProfile = async (req, res, next) => {
    try {
        const { name, email, contact, currentpassword, newpassword } = req.body;

        // console.log(req.user.password);
        // console.log(name);
        // console.log(email);
        // console.log(contact);
        // res.send("OK");

        req.user.username = name;
        req.user.email = email;
        req.user.contact = contact;

        if (currentpassword) {
            bcrypt.compare(currentpassword, req.user.password).then(function (result) {
                if (result == false) {
                    req.flash('fakeuser', 'Current Password is incorrect');
                    res.redirect('/shop/update-profile');
                }
                else {
                    bcrypt.genSalt(saltRounds, async function (err, salt) {
                        bcrypt.hash(newpassword, salt, async function (err, hash) {
                            req.user.password = hash;
                            await req.user.save();

                            res.redirect('/shop/profile');
                        });
                    });
                }
            });
        }
        else {
            await req.user.save();
            res.redirect('/shop/profile');
        }

        // bcrypt.genSalt(saltRounds, async function (err, salt) {
        //     bcrypt.hash(password, salt, async function (err, hash) {
        //         req.user.password = hash;
        //         await req.user.save();

        //         res.redirect('/shop/profile');
        //     });
        // });
    }
    catch (err) {
        next(err);
    }
}