const { scrapeAndel } = require('./websites/andele');
const { scrapeSS } = require('./websites/ss');
const { scrapeSkelbiu } = require('./websites/skelbiu');
const { fromNotion } = require('../fnotion/fnotion');
const { scrapeFbmarketplace } = require('./websites/fbmarketplace')

async function scrapeWebsites() {
    const links = await fromNotion('links');
    console.log(links)
    let everything = []
    for (const link of links) {
        if (link.includes('andelemandele.lv')) {
            console.log('andelemandele.lv')
            const results = await scrapeAndel(link);
            everything = everything.concat(results)
        } else if (link.includes('ss.com')) {
            console.log("ss.com")
            const results = await scrapeSS(link);
            everything = everything.concat(results)
        } else if (link.includes('skelbiu.lt')) {
            console.log("skelbiu.lt")
            const results = await scrapeSkelbiu(link);
            everything = everything.concat(results)
        } else if (link.includes('facebook.com/marketplace')) {
            console.log('facebook.com/marketplace')
            const results = await scrapeFbmarketplace(link)
            everything = everything.concat(results)
        }
    }
    return everything
}

module.exports = { scrapeWebsites }