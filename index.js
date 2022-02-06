const {Builder} = require('selenium-webdriver');
const dotenv = require('dotenv');
const Monthly = require('./scrappers/Monthly');
const fileWriter = require('./util/file');

dotenv.config();

(async function run() {
  const driver = await new Builder().forBrowser('firefox').build();
  try {
    const url = new URL(process.env.URL);
    const monthly = new Monthly({
      base: url.origin,
      page: url.pathname,
      driver,
    });
    console.log('processing...');
    const result = await monthly.scrap();
    fileWriter.writeToFile('output.json', result);
    console.log('result saved at output.json');
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }
}());
