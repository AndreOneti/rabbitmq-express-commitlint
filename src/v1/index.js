const app = require('express')();

//* Routes
const LOGIN = require('./routes/Login');

app.use('/login', LOGIN);

module.exports = app;
