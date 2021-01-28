const { Parser } = require('json2csv');

const json2csvParser = new Parser();

const jsonToCsv = data => json2csvParser.parse(data);

module.exports = jsonToCsv;
module.exports.jsonToCsv = jsonToCsv;
