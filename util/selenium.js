const {Builder} = require('selenium-webdriver');

const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
    module.exports = function fetchData(url) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: url
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    };
} else {
    (async function crawl() {
        let driver = await new Builder().forBrowser('firefox').build();
        try {
            await driver.get(workerData);
            parentPort.postMessage(await driver.getPageSource());
        } finally {
            await driver.quit();
        }
    })();
}
