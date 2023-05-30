const { scrapeAndel } = require('./websites/andele');
const { scrapeSS } = require('./websites/ss');
const { scrapeSkelbiu } = require('./websites/skelbiu');
const { fromNotion } = require('../fnotion/fnotion');

async function scrapeWebsites() {
    const links = await fromNotion('links');

    let everything = []
    for (const link of links) {
        if (link.includes('andelemandele.lv')) {
            const results = await scrapeAndel(link);
            everything = everything.concat(results)
        } else if (link.includes('ss.com')) {
            const results = await scrapeSS(link);
            everything = everything.concat(results)
        } else if (link.includes('skelbiu.lt')) {
            const results = await scrapeSkelbiu(link);
            everything = everything.concat(results)
        }
    }
    return everything
}

module.exports = { scrapeWebsites };