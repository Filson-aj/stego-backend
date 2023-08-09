const express = require('express'),
    router = express.Router(),
    stego = require('../controllers/stego.controller');

module.exports = app =>{
    router.post('/crypto-stego/encrypt', stego.encrypt);
    router.post('/crypto-stego/decrypt', stego.decrypt);

    app.use(router);
};