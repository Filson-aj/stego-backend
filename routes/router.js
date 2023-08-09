const express = require('express'),
    router = express.Router(),
    stego = require('../controllers/stego.controller');

module.exports = app =>{
    router.post('/crypto-stego/encrypt', stego.encrypt);
    router.post('/crypto-stego/decrypt', stego.decrypt);

    router.get('/', (req, res) =>{
        res.send("<h1>Welcome to stegnograph apis</h1>");
    });

    app.use(router);
};
