const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const profileSchema = mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
});

profileSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Profile', profileSchema);