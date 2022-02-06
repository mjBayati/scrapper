const Scrapper = require('./Scrapper');
cheerio = require('cheerio');

class Daily extends Scrapper{
    extractCloudInfo(element) {
        const result = {};
        const cloudInfo = cheerio.load(element);
        cloudInfo('.panel-items').each((idx, element) => {
            result[cloudInfo(element).text().trim()] = cloudInfo(element).children('.value').text().trim();
        })
        return result;
    }

    extract() {
        const elements = this.dom('.half-day-card');
        const result = [];
        elements.each((idx, element) => {
            const type = this.dom(element).children('.half-day-card-header').children('.title').text().trim();
            const value = this.extractCloudInfo(element);
            result.push({type, value});
        })
        return result;
    }
}

module.exports = Daily;