var Sequelize = require('sequelize');
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
        productId: {type: Sequelize.STRING, unique: true}
    });
    const product = Product.findOne({ raw:true, where: { productId: req.params.productId }})
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({ error }));
}

exports.createProduct = (req, res, next) => {
    var Product = sequelize.define('product', {
        userId: {type: Sequelize.STRING},
        title: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        productId: {type: Sequelize.STRING, unique: true}
    });
    sequelize.sync().then(function() {
        return Product.create({
            userId: req.body.userId,
            title: req.body.title,
            lastName: req.body.lastName,
            date: req.body.date,
            message: req.body.message,
            name: req.body.name,
            productId: Math.random().toString(36).slice(2)
        });
    })
        .then(() => res.status(201).json({message: 'Produit crée !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyProduct = (req, res, next) => {
    var Product = sequelize.define('product', {
        userId: {type: Sequelize.STRING},
        title: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        productId: {type: Sequelize.STRING, unique: true}
    });
    
    Product.update(
        {
            userId: req.body.product.userId,
            title: req.body.titleForm,
            lastName: req.body.product.lastName,
            date: req.body.product.date,
            message: req.body.messageForm,
            name: req.body.product.name,
            productId: req.body.product.productId
        },
        { 
            where: { productId: req.body.product.productId }
        })
        .then(() => res.status(200).json({ message: 'Produit modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteProduct = (req, res, next) => {
    var Product = sequelize.define('product', {
        userId: Sequelize.STRING,
        title: Sequelize.STRING,
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        productId: {type: Sequelize.STRING, unique: true}
    });
    Product.destroy({ where: { productId: req.params.productId }})
        .then(() => res.status(200).json({ message: 'Produit supprimé !' }))
        .catch(error => res.status(400).json({ error }))
}