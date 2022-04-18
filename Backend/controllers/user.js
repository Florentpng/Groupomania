const bcrypt = require('bcrypt');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('groupomania', 'root', 'oblivion99', {
    host: 'localhost',
    dialect: 'mysql'
});

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            var User = sequelize.define('user', {
                email: {type: Sequelize.STRING, unique: true},
                password: Sequelize.STRING,
                userId: Sequelize.STRING
            });
            sequelize.sync().then(function() {
                return User.create({
                  email: req.body.email,
                  password: hash,
                  userId: Math.random().toString(36).slice(2)
                });
            })
                .then(() => res.status(201).json({ message: 'Utilisateur enregistré !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    var User = sequelize.define('user', {
        email: {type: Sequelize.STRING, unique: true},
        password: Sequelize.STRING,
        userId: Sequelize.STRING
    });
    const user = User.findOne({ raw:true, where: { email: req.body.email }})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user.userId,
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};