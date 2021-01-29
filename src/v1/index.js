const app = require('express')();

//* Routes
const LOGIN = require('./routes/Login');
const RABBITMQ = require('./routes/rabbitmq');
const CSV = require('./routes/Csv');

app.use('/', LOGIN);
app.use('/', RABBITMQ);
app.use('/', CSV);

module.exports = app;
