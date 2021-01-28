const { Connection, Channel, connect, Message } = require('amqplib');

class RabbitmqService {

  /** @type {Connection} */
  #connection
  /** @type {Channel} */
  #channel
  /** @type {string} */
  #url

  /**
   * @param {string} url - connection url
   */
  constructor(url) {
    this.#url = url;
  }

  /**
   * @returns {Promise<void>}
   */
  async start() {
    this.#connection = await connect(this.#url);
    this.#channel = await this.#connection.createChannel();
  }

  /**
   * @param {string} queue
   * @param {string} message
   *
   * @returns {Promise<any>}
   */
  async publishInQueue(queue, message) {
    return this.#channel.sendToQueue(queue, Buffer.from(message));
  }

  /**
   * @param {string} exchange
   * @param {string} routingKey
   * @param {string} message
   *
   * @returns {Promise<boolean>}
   */
  async publishInExchange(exchange, routingKey, message) {
    return this.#channel.publish(exchange, routingKey, Buffer.from(message));
  }

  /**
   * @param {string} queue
   * @param {(message:Message)=> void} callback
   *
   * @returns {Promise<void>}
   */
  async consume(queue, callback) {
    return this.#channel.consume(queue, (message) => {
      callback(message);
      this.#channel.ack(message);
    });
  }
}

module.exports = RabbitmqService;
