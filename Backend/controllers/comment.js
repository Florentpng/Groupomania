var Sequelize = require('sequelize');
var sequelize = new Sequelize('groupomania', 'root', 'oblivion99', {
    host: 'localhost',
    dialect: 'mysql'
});

exports.getAllComment = ((req, res, next) => {
    var Comment = sequelize.define('comment', {
        userId: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        productId: {type: Sequelize.STRING},
        commentId: {type: Sequelize.STRING, unique: true}
    });
    Comment.findAll({where: { productId: req.params.productId }})
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
});

exports.createComment = (req, res, next) => {
    var Comment = sequelize.define('comment', {
        userId: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        productId: {type: Sequelize.STRING},
        commentId: {type: Sequelize.STRING, unique: true}
    });
    sequelize.sync().then(function() {
        return Comment.create({
            userId: req.body.userId,
            lastName: req.body.lastName,
            date: req.body.date,
            message: req.body.message,
            name: req.body.name,
            productId: req.body.productId,
            commentId: Math.random().toString(36).slice(2)
        });
    })
        .then(() => res.status(201).json({message: 'Commentaire crée !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyComment = (req, res, next) => {
    var Comment = sequelize.define('comment', {
        userId: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        productId: {type: Sequelize.STRING},
        commentId: {type: Sequelize.STRING, unique: true}
    });
    Comment.update(
        {
            userId: req.body.comment.userId,
            title: req.body.comment.title,
            lastName: req.body.comment.lastName,
            date: req.body.comment.date,
            message: req.body.messageForm,
            name: req.body.comment.name,
            productId: req.body.comment.productId,
            commentId: req.body.comment.commentId
        },
        {
            where: { commentId: req.body.comment.commentId }
        })
        .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteComment = (req, res, next) => {
    var Comment = sequelize.define('comment', {
        userId: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        date: Sequelize.DATE,
        message: Sequelize.STRING,
        name: Sequelize.STRING,
        productId: {type: Sequelize.STRING},
        commentId: {type: Sequelize.STRING, unique: true}
    });
    Comment.destroy({ where: { commentId: req.params.commentId }})
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(400).json({ error }))
}