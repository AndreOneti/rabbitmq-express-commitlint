const csvParser = require('csv-parser');
var fs = require('fs');

const csvToJson = async filePath => {
  return new Promise((resolve, reject) => {
    var csvData = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', function (csvrow) {
        csvData.push(csvrow);
      })
      .on('end', function () {
        resolve(csvData);
      })
      .on('error', function (error) {
        reject(error);
      })
  })
}

module.exports = csvToJson;
module.exports.csvToJson = csvToJson;
