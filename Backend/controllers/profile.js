var Sequelize = require('sequelize');
var sequelize = new Sequelize('groupomania', 'root', 'verysecurepwd', {
    host: 'localhost',
    dialect: 'mysql'
});

exports.getExistProfile = (req, res, next) => {
    var Profile = sequelize.define('profile', {
        userId: {type: Sequelize.STRING, unique: true},
        name: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        age: Sequelize.INTEGER
    });
    const profile = Profile.findOne({ raw:true, where: { userId: req.params.userId }})
        .then(profile => {
            if (profile) {
                return res.status(200).json({ exist: true })
            }
            if (!profile) {
                return res.status(200).json({ exist: false })
            }
        })
        .catch(error => res.status(500).json({ error }));
}

exports.createProfile = (req, res, next) => {
    var Profile = sequelize.define('profile', {
        userId: {type: Sequelize.STRING, unique: true},
        name: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        age: Sequelize.INTEGER
    });
    sequelize.sync().then(function() {
        return Profile.create({
            name: req.body.name,
            lastName: req.body.lastName,
            userId: req.body.userId,
            age: req.body.age,
        });
    })
        .then(() => res.status(201).json({ message: 'Profile enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getProfile = (req, res, next) => {
    var Profile = sequelize.define('profile', {
        userId: {type: Sequelize.STRING, unique: true},
        name: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        age: Sequelize.INTEGER
    });
    const profile = Profile.findOne({ raw:true, where: { userId: req.params.userId }})
        .then(profile => res.status(200).json(profile))
        .catch(error => res.status(404).json({ error }));
}

exports.deleteProfile = (req, res, next) => {
    var Profile = sequelize.define('profile', {
        userId: {type: Sequelize.STRING, unique: true},
        name: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        age: Sequelize.INTEGER
    });
    Profile.destroy({ where: { userId: req.params.userId }})
        .then(() => res.status(200).json({ message: 'Profile modifié !'}))
        .catch(error => res.status(500).json({ error }));
}

exports.modifyProfile = (req, res, next) => {
    var Profile = sequelize.define('profile', {
        userId: {type: Sequelize.STRING, unique: true},
        name: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        age: Sequelize.INTEGER
    });
    Profile.update(
        {
            name: req.body.name,
            lastName: req.body.lastName,
            userId: req.body.userId,
            age: req.body.age,
        },
        { 
            where: { userId: req.params.userId }
        })
        // Modify all post with the new profile
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
    Product.update(
        {
            userId: req.body.userId,
            lastName: req.body.lastName,
            name: req.body.name,
        },
        { 
            where: { userId: req.body.userId }
        })
        // Modify all comments with the new profile
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
                userId: req.body.userId,
                lastName: req.body.lastName,
                name: req.body.name,
            },
            { 
                where: { userId: req.body.userId }
            })
            
    .then(() => res.status(200).json({ message: 'Profile modifié !'}))
    .catch(error => res.status(400).json({ error }));
}