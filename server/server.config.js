require('dotenv').config();
const express = require('express'),
    path = require('path'),
    cors = require('cors'),
    morgan = require('morgan'),
    fileUpload = require('express-fileupload'),
    routes = require('../routes/router'),
    PORT = process.env.PORT || 5000;

module.exports = app =>{
    //basic app's configuration
    app.set('view', `${__dirname}/views`);
    app.set('/public', express.static(path.join(__dirname, '/public')));
    app.set('port', PORT);

    //middleware configuration
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(morgan('dev'));
    app.use(fileUpload({createParentPath: true}));

    //routing configuration
    routes(app);

    return app;
};
