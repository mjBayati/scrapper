const {Builder, WebDriver} = require('selenium-webdriver');

const Monthly = require('./scrappers/Monthly');
const fileWriter = require('./util/file');

(async function run() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        const monthly = new Monthly({
            base: 'https://www.accuweather.com',
            page: '/en/gb/london/ec4a-2/august-weather/328328',
            driver: driver
        });
        console.log('processing...')
        const result = await monthly.scrap();
        fileWriter.writeToFile('output.json', result);
        console.log("result saved at output.json");
    } catch (error) {
        console.log(error);
    } finally {
        await driver.quit();
    }
})();