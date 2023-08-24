const cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');
const Products = require('../../models/Products');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.getAddProduct = (req, res, next) => {
    res.render('addproduct', {
        isAdmin: req.user.isAdmin,
        cartCount: req.user.cart.length
    });
}

module.exports.postAddProduct = async (req, res, next) => {
    // console.log(req.file);
    const { name, description, price } = req.body;
    try {
        const parser = new DatauriParser();
        // console.log(parser.format('.png', req.file.buffer).content);
        cloudinary.uploader.upload(parser.format('.png', req.file.buffer).content, async (error, result) => {
            // console.log("Result: ", result);
            try {
                await Products.create({
                    name,
                    price,
                    description,
                    imageUrl: result.url,
                    userId: req.user._id
                })
                res.redirect('/admin/products');
            }
            catch (err) {
                return next(err);
            }
            // res.send("OK");
        });
    }
    catch (err) {
        return next(err);
    }
}

module.exports.getProducts = async (req, res, next) => {
    try {
        let products = await Products.find({ userId: req.user._id });
        res.render('admin/products', {
            products,
            isAdmin:req.user.isAdmin,
            cartCount: req.user.cart.length
        });
    }
    catch (err) {
        return next(err);
    }
}