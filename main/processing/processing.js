const { scrapeWebsites } = require('../searching/searching');
const { fromNotion } = require('../fnotion/fnotion');

async function processListings(option) {
    const listings = await scrapeWebsites();
    const keywords = await fromNotion('keywords');

    const processedListings = [];

    for (const [text, price, link, image] of listings) {
        for (const [keyword, keywordPrice] of keywords) {
            if (option === 'precise') {
                if (text.includes(keyword) && price <= keywordPrice) {
                    processedListings.push([keyword, parseInt(keywordPrice), price, link, image]);
                }
            } else if (option === 'broad') {
                if (text.includes(keyword)) {
                    processedListings.push([keyword, parseInt(keywordPrice), price, link, image]);
                }
            }
        }
    }
    return processedListings;
}

module.exports = { processListings };