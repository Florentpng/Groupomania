const Profile = require('../models/Profile');

exports.getExistProfile = (req, res, next) => {
    Profile.findOne({ userId: req.params.userId })
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
    const profile = new Profile({
        userId: req.body.userId,
        name: req.body.name,
        lastName: req.body.lastName,
        age: req.body.age,
    });
    profile.save()
        .then(() => res.status(201).json({ message: 'Profile enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getProfile = (req, res, next) => {
    Profile.findOne({ userId: req.params.userId })
        .then(profile => res.status(200).json(profile))
        .catch(error => res.status(404).json({ error }));
}

exports.deleteProfile = (req, res, next) => {
    Profile.findOne({ userId: req.params.userId })
        .then(profile => {
            Profile.deleteOne({ userId: req.params.userId })
                .then(() => res.status(200).json({ message: 'Profile supprimé !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
}

exports.modifyProfile = (req, res, next) => {
    Profile.findOne({ userId: req.params.userId })
    const profileObject = req.file ?
      {
        ...JSON.parse(req.body),
      } : { ...req.body };
    Profile.updateOne({ userId: req.params.userId }, { ...profileObject, userId: req.params.userId })
      .then(() => res.status(200).json({ message: 'Profile modifié !'}))
      .catch(error => res.status(400).json({ error }));
}