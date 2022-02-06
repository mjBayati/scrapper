const Scrapper = require('./Scrapper');
const Daily = require('./Daily');
const strings = require('../util/strings');
const cheerio = require('cheerio');


class Monthly extends Scrapper {
  extractHeaders() {
    const monthlyHeaders = this.dom('.monthly-header .day-text span');

    const headers = [];

    monthlyHeaders.each((idx, element) => {
      cheerio.load(element).html();
      headers.push(strings.trimText(this.dom(element).text()));
    });
    return headers;
  }

  extractDailyFromInnerNodes(element) {
    const dayNumber = strings.trimText(this.dom(element).children('.monthly-panel-top').children('.date').text());
    const historyAverage = {
      high: strings.trimText(this.dom(element).children('.history-avg').children('.high').text()),
      low: strings.trimText(this.dom(element).children('.history-avg').children('.low').text()),
    };
    return {dayNumber, historyAverage};
  }

  async extractDailyWhetherInfo() {
    const daysWhetherList = this.dom('.monthly-daypanel');
    const dailyScrappers = [];
    const data = [];
    daysWhetherList.each((idx, element) => {
      const url = this.dom(element).attr('href').trim();
      const briefData = this.extractDailyFromInnerNodes(element);
      dailyScrappers.push({
        scrapper: new Daily({
          base: this.base,
          page: url,
          driver: this.driver,
        }),
        briefData,
      });
    });
    for (const scrapper of dailyScrappers) {
      data.push({detailed: await scrapper.scrapper.scrap(), brief: scrapper.briefData});
    }
    return data;
  }

  async extract() {
    const data = await this.extractDailyWhetherInfo();
    const headers = this.extractHeaders();
    return {data, headers};
  }
}

module.exports = Monthly;
