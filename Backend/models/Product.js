const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: String, required: true},
    imageUrl: {type: String, required: false},
    message: {type: String, required: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
});

module.exports = mongoose.model('Product', productSchema);