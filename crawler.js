const Crawler = require('crawler');
const MonthlyScrapper = require('./scrappers/Monthly');
process.env.UV_THREADPOOL_SIZE = 128;

const headers = {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    "x-client-data": "CI22yQEIo7bJAQipncoBCJ75ywEI54TMAQ=="
};

const c = new Crawler({
    maxConnections : 100,
    rateLimit: 100,
    referrerPolicy: "strict-origin-when-cross-origin",
    headers,
    // This will be called for each crawled page
    callback: function (err, res, done) {

        let dom, self = this;

        if (err) {
            console.log(err);
        } else {
            console.log(res.body);
            // const monthlyScrapper = new MonthlyScrapper(res);
            // monthlyScrapper.extractInfo();
        }

        done();
    }

});

c.direct({
    uri: 'https://www.accuweather.com',
    method: 'GET',
    headers,
    callback: (error, response) => {
        if (error) {
            console.log(error)
        } else {
            console.log(response.statusCode);
        }
    }
});