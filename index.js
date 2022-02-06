const {Builder} = require('selenium-webdriver');

const Monthly = require('./scrappers/Monthly');


(async function run() {
    try {
        const monthly = new Monthly('https://www.accuweather.com/en/gb/london/ec4a-2/august-weather/328328');
        monthly.extract();
    } catch (error) {
        console.log(error);
    }
})();