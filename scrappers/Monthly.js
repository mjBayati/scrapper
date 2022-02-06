const Scrapper = require('./Scrapper');
const strings = require('../util/strings');
cheerio = require('cheerio');


const utils = {
    trimText(strInput) {
        return strInput.replace(/\n/g,'').replace(/\t/g,'');
    }
}

class Monthly extends Scrapper {
    extractHeaders() {
        const monthlyHeaders = this.dom('.monthly-header .day-text span');

        const headers = [];

        monthlyHeaders.each((idx, element) => {
            cheerio.load(element).html();
            headers.push(utils.trimText(this.dom(element).text()));
        })
        return headers;
    }

    extractDayInfo(element) {
        const dayNumber = utils.trimText(this.dom(element).children('.monthly-panel-top').children('.date').text());
        const historyAverage = {
            high: utils.trimText(this.dom(element).children('.history-avg').children('.high').text()),
            low: utils.trimText(this.dom(element).children('.history-avg').children('.low').text()),
        }
        return {dayNumber, historyAverage};
    }

    extractDailyWhetherInfo() {
        const daysWhetherList = this.dom('.monthly-daypanel');
        const data = [];
        daysWhetherList.each((idx, element) => {
            data.push(this.extractDayInfo(element));
        });
        return data;
    }

    async extract() {
        await this.crawl();
        const data = this.extractDailyWhetherInfo();
        const headers = this.extractHeaders();
        console.log(data, headers);
    }
}

module.exports = Monthly;