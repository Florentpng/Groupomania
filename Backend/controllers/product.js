const Product = require('../models/Product')

exports.getAllProduct = ((req, res, next) => {
    Product.find()
        .then((products) => res.status(200).json(products))
        .catch(error => res.status(400).json({ error }));
});

exports.createProduct = (req, res, next) => {
    const product = new Product({
        userId: req.body.userId,
        title: req.body.title,
        date: req.body.date,
        imageUrl: req.body.imageUrl,
        message: req.body.message,
        name: req.body.name,
        lastName: req.body.lastName,
    });
    product.save()
        .then(() => res.status(201).json({message: 'Produit crée !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyProduct = (req, res, next) => {
    Product.findOne({ _id: req.params._id })
    const productObject = req.file ?
      {
        ...JSON.parse(req.body),
      } : { ...req.body };
    Product.updateOne({ userId: req.params.userId }, { ...productObject, userId: req.params.userId })
      .then(() => res.status(200).json({ message: 'Produit modifié !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.deleteProduct = (req, res, next) => {
    Product.findOne({ _id: req.params._id })
        .then(product => {
            Product.deleteOne({ userId: req.params.userId })
                .then(() => res.status(200).json({ message: 'Produit supprimé !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error })); 
}