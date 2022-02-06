cheerio = require('cheerio');
const crawler = require('../util/seleniumWorker');

class Scrapper {
    constructor({base , page, driver}) {
        this.base = base;
        this.page = page;
        this.driver = driver;
    }

    async crawl() {
        this.dom = cheerio.load(await crawler(this.base + this.page, this.driver));
    }

    async extract() {
        throw new Error('not implemented');
    }

    async scrap() {
        await this.crawl();
        return this.extract();
    }
}

module.exports = Scrapper;