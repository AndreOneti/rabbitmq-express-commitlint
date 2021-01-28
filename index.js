'use strict'

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cookieParser = require("cookie-parser");
const httpErrors = require("http-errors");
const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const ISDEVELOPMENT = process.env.NODE_ENV !== "DEVELOPMENTE" || process.env.NODE_ENV !== "developmente";
const PORT = process.env.PORT || 3000;
const app = express();

const routes = require('./src/v1');

//* Define swagger-jsdoc properties
var options = {
  swaggerDefinition: {
    // openapi: '3.0.0',
    info: {
      title: 'Swagger express api + rabbitmq + jsdoc',
      version: '1.0.0',
      description: 'A simple express API using rabbitmq, jsdoc and express',
    },
    basePath: '/v1',
    // host: `http://${process.env.IP || "localhost"}:${PORT}`,
  },
  apis: ['./src/**/*.js'],
};

//* Define swagger doc
var swaggerSpec = swaggerJSDoc(options);

//* Disable  x powered
app.disable('x-powered-by');

//*Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* Routes
app.use('/v1/', routes);

//* Documentations
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/v1/api-file', (_req, res) => {
  res.status(200).send(swaggerSpec).end();
});

//* Error handler
app.use(function (req, res, next) {
  next(httpErrors(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(ISDEVELOPMENT ? err.message : 'Error');
});

//* Listener
app.listen(PORT, () => {
  console.log(`Server linten on http://localhost:${PORT}/v1/api-docs`);
});
