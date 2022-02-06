const {Builder} = require('selenium-webdriver');

const Monthly = require('./scrappers/Monthly');


(async function run() {
    try {
        let driver = await new Builder().forBrowser('firefox').build();
        const monthly = new Monthly({
            base: 'https://www.accuweather.com',
            page: '/en/gb/london/ec4a-2/august-weather/328328',
            driver: driver
        });
        await monthly.scrap();
    } catch (error) {
        console.log(error);
    }
})();