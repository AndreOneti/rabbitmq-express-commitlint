const RabbitmqService = require('./src/v1/services/rabbitmq.service');
const config = require('./src/config');
const { writeFileSync } = require('fs');
const { resolve } = require('path');

const consumer = async () => {
  const server = new RabbitmqService(config.rabbitConnection);
  await server.start();
  await server.consume('rabbit', (message) => console.log("[Consumer Route] > " + message.content.toString()));
}

consumer();
