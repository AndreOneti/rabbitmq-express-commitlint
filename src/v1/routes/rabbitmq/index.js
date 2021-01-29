const { Router } = require("express");

const RabbitmqService = require('../../services/rabbitmq.service');
const config = require('../../../config');

const router = Router();

/**
 * @swagger
 *  /rabbit:
 *  post:
 *    tags: [rabbitmq]
 *    summary: Create a message on rabbitmq
 *
 *    consumes: [application/json]
 *    parameters:
 *      - name: body
 *        description: Request body
 *        in: body
 *        required: true
 *        type: object
 *        schema:
 *          properties:
 *            username:
 *               description: User nick name
 *               type: string
 *               example: Roy Mustang
 *            _id:
 *               description: User id
 *               type: string
 *               example: 9ee3c4a0-df6b-a211-8db4-2eae9f965c0c
 *
 *    produces: [application/json]
 *
 *    responses:
 *      204:
 *        description: Remove access from user token
 *
 *      400:
 *        description: Bad request, missin parameters
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *              example: true
 *
 */
router.post('/rabbit', async (req, res) => {
  const server = new RabbitmqService(config.rabbitConnection);
  await server.start();
  await server.publishInExchange('amq.direct', 'token.del', JSON.stringify(req.body));
  return res.status(204).end();
});

module.exports = router;
