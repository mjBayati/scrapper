const Scrapper = require('./Scrapper');
const cheerio = require('cheerio');

class Daily extends Scrapper {
  extractCloudInfo(element) {
    const result = {};
    const cloudInfo = cheerio.load(element);
    cloudInfo('.panel-item').each((idx, innerElement) => {
      result[cloudInfo(innerElement).text().trim()] = cloudInfo(innerElement).children('.value').text().trim();
    });
    return result;
  }

  extract() {
    const elements = this.dom('.half-day-card');
    const result = [];
    elements.each((idx, element) => {
      const type = this.dom(element).children('.half-day-card-header').children('.title').text()
        .trim();
      const value = this.extractCloudInfo(element);
      result.push({type, value});
    });
    return result;
  }
}

module.exports = Daily;
