cheerio = require('cheerio');
const crawler = require('../util/selenium');

class Scrapper {
    constructor(url) {
        this.url = url;
        this.dom = null;
    }

    async crawl() {
        this.dom = cheerio.load(await crawler(this.url));
    }

    async extract() {
        throw new Error('not implemented');
    }
}