var Sequelize = require('sequelize');
const fs = require('fs');
var sequelize = new Sequelize('groupomania', 'root', 'oblivion99', {
    host: 'localhost',
    dialect: 'mysql'
});

exports.getAllProduct = ((req, res, next) => {
    var Product = sequelize.define('product', {
        userId: {type: Sequelize.STRING},
        title: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        imageUrl:Sequelize.STRING,
        productId: {type: Sequelize.STRING, unique: true}
    });
    Product.findAll()
        .then((products) => res.status(200).json(products))
        .catch(error => res.status(400).json({ error }));
});

exports.getProduct = (req, res, next) => {
    var Product = sequelize.define('product', {
        userId: {type: Sequelize.STRING},
        title: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        imageUrl:Sequelize.STRING,
        productId: {type: Sequelize.STRING, unique: true}
    });
    const product = Product.findOne({ raw:true, where: { productId: req.params.productId }})
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({ error }));
}

exports.createProduct = ((req, res, next) => {
    var Product = sequelize.define('product', {
        userId: {type: Sequelize.STRING},
        title: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        imageUrl: Sequelize.STRING,
        productId: {type: Sequelize.STRING, unique: true}
    });
    sequelize.sync().then(function() {
        if (req.file) {
            return Product.create({
                userId: req.body.userId,
                title: req.body.title,
                lastName: req.body.lastName,
                date: req.body.date,
                message: req.body.message,
                name: req.body.name,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                productId: Math.random().toString(36).slice(2)
            });
        } else {
            return Product.create({
                userId: req.body.userId,
                title: req.body.title,
                lastName: req.body.lastName,
                date: req.body.date,
                message: req.body.message,
                name: req.body.name,
                imageUrl: null,
                productId: Math.random().toString(36).slice(2)
            });
        }
    })
        .then(() => res.status(201).json({message: 'Produit crée !'}))
        .catch(error => res.status(400).json({ error }));
})

exports.modifyProduct = (req, res, next) => {
    var Product = sequelize.define('product', {
        userId: {type: Sequelize.STRING},
        title: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        imageUrl:Sequelize.STRING,
        productId: {type: Sequelize.STRING, unique: true}
    });
    if (req.file) {
        
        Product.update(
            {
                userId: req.body.userId,
                title: req.body.title,
                lastName: req.body.lastName,
                date: req.body.date,
                message: req.body.message,
                name: req.body.name,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                productId: req.params.productId
            },
            {
                where: { productId: req.params.productId }
            }
        )
        .then(() => res.status(200).json({ message: 'Produit modifié !'}))
        .catch(error => res.status(400).json({ error }));
    } if ( req.body.deleteImage === "null" && !req.file || req.body.deleteImage === "false" && !req.file) {
        
        Product.update(
            {
                userId: req.body.userId,
                title: req.body.title,
                lastName: req.body.lastName,
                date: req.body.date,
                message: req.body.message,
                name: req.body.name,
                productId: req.params.productId
            },
            {
                where: { productId: req.params.productId }
            }
        )
        .then(() => res.status(200).json({ message: 'Produit modifié !'}))
        .catch(error => res.status(400).json({ error }));
    } if (req.body.deleteImage === "true") {
        
            const filename = req.body.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
        Product.update(
            {
                userId: req.body.userId,
                title: req.body.title,
                lastName: req.body.lastName,
                date: req.body.date,
                message: req.body.message,
                name: req.body.name,
                imageUrl: null,
                productId: req.params.productId
            },
            {
                where: { productId: req.params.productId }
            }
        )
        .then(() => res.status(200).json({ message: 'Produit modifié !'}))
        .catch(error => res.status(400).json({ error }))
    });
    
    }
}

exports.deleteProduct = (req, res, next) => {
    var Product = sequelize.define('product', {
        userId: Sequelize.STRING,
        title: Sequelize.STRING,
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        imageUrl:Sequelize.STRING,
        productId: {type: Sequelize.STRING, unique: true}
    });
    const product = Product.findOne({ raw:true, where: { productId: req.params.productId }})
    .then(product => {
        if (product.imageUrl != null) {
            const filename = product.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Product.destroy({ where: { productId: req.params.productId }})
            });
        } else {
            Product.destroy({ where: { productId: req.params.productId }})
        }
        var Comment = sequelize.define('comment', {
            userId: {type: Sequelize.STRING},
            lastName: Sequelize.STRING,
            date: Sequelize.DATE,
            message: Sequelize.STRING,
            name: Sequelize.STRING,
            productId: {type: Sequelize.STRING},
            commentId: {type: Sequelize.STRING, unique: true}
        });
        Comment.destroy({ where: { productId: req.params.productId}})
            .then(() => res.status(200).json({ message: 'Produit supprimé !' }))
            .catch(error => res.status(400).json({ error }))
    })
}