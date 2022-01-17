const mongoose = require('mongoose');
const express = require('express');

mongoose.connect('mongodb+srv://Flowze:<password>@cluster0.egn6b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    })
.then(() => console.log('Connection à MongoDB réussie !'))
.catch(() => console.log('Connection à MongoDB échouée !'))