const { Router } = require("express");
const multer = require("multer");
var fs = require('fs');

const { jsonToCsv, csvToJson } = require('../../../utils');
const upload = multer({ dest: "tmp/csv/" });

const router = Router();

/**
 * @swagger
 *  /to-csv:
 *  post:
 *    tags: [Csv]
 *    summary: Convert csv to json
 *
 *    consumes: [application/json]
 *    parameters:
 *      - name: body
 *        in: body
 *        type: object
 *
 *    produces: [application/json]
 *
 *    responses:
 *      200:
 *        description: Every thing is OK
 *
 */
router.post('/to-csv', (req, res) => {
  const csv = jsonToCsv(req.body);
  return res
    .status(200)
    .header("Content-Type", "text/csv")
    .attachment("output.csv")
    .send(csv)
    .end();
});

/**
 * @swagger
 *  /from-csv:
 *  post:
 *    tags: [Csv]
 *    summary: Convert csv to json
 *
 *    consumes: [multipart/form-data]
 *
 *    parameters:
 *      - name: file
 *        description: File to convert in to json
 *        in: formData
 *        required: true
 *        type: file
 *
 *    produces: [application/json]
 *
 *    responses:
 *      200:
 *        description: Every thing is OK
 *
 */
router.post('/from-csv', upload.single("file"), async (req, res) => {
  const file = await csvToJson(req.file.path);
  fs.rm(req.file.path, () => { });
  return res
    .status(200)
    .send(file)
    .end();
});

module.exports = router;
