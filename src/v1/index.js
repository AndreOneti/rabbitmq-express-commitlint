const app = require('express')();

//* Routes
const LOGIN = require('./routes/Login');
const RABBITMQ = require('./routes/rabbitmq');

app.use('/login', LOGIN);
app.use('/rabbit', RABBITMQ);

module.exports = app;
