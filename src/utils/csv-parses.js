const csvParser = require('csv-parser');

var fs = require('fs');

const csvToJson = filePath => {
  var csvData = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', function (csvrow) {
      csvData.push(csvrow);
    })
    .on('end', function () {
      return csvData;
    });
}

module.exports = csvToJson;
module.exports.csvToJson = csvToJson;
