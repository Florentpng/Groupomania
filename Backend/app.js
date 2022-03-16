const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');

mongoose.connect('mongodb+srv://Flowze:oblivion99@cluster0.egn6b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    })
.then(() => console.log('Connection à MongoDB réussie !'))
.catch(() => console.log('Connection à MongoDB échouée !'));

const app = express()

app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/product', productRoutes)
app.use('/api/auth', userRoutes);
app.use('/api/profile', profileRoutes)

module.exports = app;