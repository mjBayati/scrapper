# WebScrapper

Scrapper is a template project to crawl data from sources that block usual crawlers.

## Installation
- ** This package use [selenium web driver](https://www.npmjs.com/package/selenium-webdriver) as crawler tool
- ** To rub this project you need to have node14 or above
- ** Use package manager [yarn](https://yarnpkg.com/) to install scrapper.

```bash
git clone https://github.com/mjBayati/scrapper.git
cd crawler
cp .env.example .env
yarn install
yarn start
```

### Usage

Add your desired monthly page url from [accuweather](https://www.accuweather.com) to .env file.
The output.json will have result json file.