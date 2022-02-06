const {Builder} = require('selenium-webdriver');

const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
    module.exports = function fetchData(url, driver) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: {url, driver}
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
            const {url, driver} = workerData;
            await driver.get(url);
            parentPort.postMessage(await driver.getPageSource());
    })();
}
