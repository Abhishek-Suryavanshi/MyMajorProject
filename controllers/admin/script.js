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
            isAdmin: req.user.isAdmin,
            cartCount: req.user.cart.length
        });
    }
    catch (err) {
        return next(err);
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    const { productId, imageUrl } = req.body;
    // console.log(productId);

    try {
        if (imageUrl) {
            //Get the public_id of image from cloudinary url
            let splitar = imageUrl.split('/');
            // console.log(splitar[splitar.length-1]);

            let public_id = splitar[splitar.length - 1].split('.')[0];
            // console.log(public_id);

            //Now use the cloudinary api to delete this image
            cloudinary.uploader.destroy(public_id)
                .then((result) => {
                    console.log(result.result);
                })
        }

        await Products.deleteOne({ _id: productId });

        let data = await Products.find({});
        // console.log(data);
        res.send(data);
    }
    catch (err) {
        return next(err);
    }

    // res.send("Haa chalri hai bhai delete request");
}

module.exports.getUpdateProduct = async (req, res, next) => {
    const { productId } = req.query;
    try {
        // console.log(productId);
        let product = await Products.findOne({ _id: productId });
        // console.log(product);
        // console.log(product.imageUrl);
        res.render('admin/updateProduct', {
            product,
            isAdmin: req.user.isAdmin,
            cartCount: req.user.cart.length
        });
        // res.send("OK");
    }
    catch (err) {
        return next(err);
    }
}

module.exports.putUpdateProduct = async (req, res, next) => {
    try {
        const { name, description, price, imageUrl, productId } = req.body;
        // console.log(req.file);
        // console.log(name, " ", price, " ", description);
        // console.log(imageUrl);

        //Get the public_id of image from cloudinary url
        let splitar = imageUrl.split('/');
        // console.log(splitar[splitar.length-1]);

        let public_id = splitar[splitar.length - 1].split('.')[0];
        // console.log(public_id);

        //Now use the cloudinary api to delete this image
        cloudinary.uploader.destroy(public_id)
            .then((result) => {
                console.log(result.result);
            })

        //Now update or replace the details
        const parser = new DatauriParser();
        cloudinary.uploader.upload(parser.format('.png', req.file.buffer).content, async (error, result) => {
            // console.log("Result: ", result);
            try {
                await Products.updateOne(
                    { _id: productId },
                    {
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

        // res.send("OK");
    }
    catch (err) {
        return next(err);
    }
}