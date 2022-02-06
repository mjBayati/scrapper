const fs = require('fs');

module.exports = {
  writeToFile(path, jsonObject) {
    fs.writeFile(path, JSON.stringify(jsonObject), 'utf8', (err) => {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        throw err;
      }
    });
  },
};
