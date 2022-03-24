const Profile = require('../models/Profile');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('groupomania', 'root', 'oblivion99', {
    host: 'localhost',
    dialect: 'mysql'
});

exports.getExistProfile = (req, res, next) => {
    var Profile = sequelize.define('profile', {
        userId: {type: Sequelize.STRING, unique: true},
        name: {type: Sequelize.STRING},
        lastName: Sequelize.STRING,
        age: Sequelize.STRING
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
        age: Sequelize.STRING
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
        age: Sequelize.STRING
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
        age: Sequelize.STRING
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
        age: Sequelize.STRING
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
        .then(() => res.status(200).json({ message: 'Profile modifié !'}))
        .catch(error => res.status(400).json({ error }));
}