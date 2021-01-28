const { Router } = require("express");

const { generateUniqueID: uuid } = require('dot_functions_utils');

const router = Router();

/**
 * @swagger
 *  /login:
 *  post:
 *    tags: [Login]
 *    summary: Try login user
 *
 *    consumes: [application/json]
 *
 *    parameters:
 *      - name: body
 *        description: Request bode
 *        in: body
 *        required: true
 *        type: object
 *        schema:
 *          properties:
 *            username:
 *               description: User nick name to login on application
 *               type: string
 *               required: true
 *               example: Roy Mustang
 *            password:
 *               description: User password
 *               type: string
 *               required: true
 *               example: 123456
 *            passwordConfirm:
 *               description: User password confirmation
 *               type: string
 *               required: true
 *               example: 123456
 *
 *    produces: [application/json]
 *
 *    responses:
 *      200:
 *        description: Return if user is loged
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *               description: DB id
 *               type: string
 *               example: 9ee3c4a0-df6b-a211-8db4-2eae9f965c0c
 *            username:
 *               description: User nick name
 *               type: string
 *               example: Roy Mustang
 *            error:
 *              type: boolean
 *              example: false
 *            logged:
 *              type: boolean
 *              example: true
 *            message:
 *              type: string
 *              example: User is logged
 *      404:
 *        description: Return if user not found
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *              example: true
 *            message:
 *              type: string
 *              example: User not found
 *      400:
 *        description: Missing parameters
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: boolean
 *              example: true
 *            menssage:
 *               type: string
 *               example: Missing parameters
 *
 */
router.post('/', (req, res) => {
  const {
    username,
    password,
    passwordConfirm,
  } = req.body;
  if (!username || !password || !passwordConfirm) {
    return res
      .status(400)
      .json({
        "error": true,
        "menssage": "Missing parameters"
      })
      .end();
  }
  if (username !== "Roy Mustang" || password !== passwordConfirm) {
    return res
      .status(404)
      .json({
        "error": true,
        "message": "User not found"
      })
      .end();
  }
  return res.json({
    _id: uuid(),
    username,
    logged: true
  }).end();
});

module.exports = router;
