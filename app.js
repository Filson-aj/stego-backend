const express = require('express'),
    configuration = require('./server/server.config');

//initialize server    
let app = express();

//general configuration
app = configuration(app);
const PORT = app.get('port');
global.apppath = __dirname;

//start server
app.listen(PORT, console.log(`Server is running at http://localhost:${PORT}`));