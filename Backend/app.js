const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const commentRoutes = require('./routes/comment');
  
var con = mysql.createConnection({ // Created the Connection
    host: "localhost",
    user: "root",
    password: "oblivion99"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  
    con.query("USE groupomania",
        function (err, result) {
            if (err) throw err;
            console.log("Using groupomania DB OK");
        });
});

const app = express()

app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())

app.use('/api/product', productRoutes)
app.use('/api/auth', userRoutes);
app.use('/api/profile', profileRoutes)
app.use('/api/comment', commentRoutes)

module.exports = app;