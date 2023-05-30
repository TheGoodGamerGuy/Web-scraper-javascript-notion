const { scrapeWebsites } = require('../searching/searching');
const { fromNotion } = require('../fnotion/fnotion');

async function processListings(type) {
    const listings = await scrapeWebsites();
    const keywords = await fromNotion('keywords');

    const processedListings = [];

    for (const [text, price, link, image] of listings) {
        for (const [keyword, keywordPrice] of keywords) {
            if (type === 'precise') {
                if (text.includes(keyword) && price <= keywordPrice) {
                    processedListings.push([keyword, parseInt(keywordPrice), price, link, image]);
                }
            } else if (type === 'broad') {
                if (text.includes(keyword)) {
                    processedListings.push([keyword, parseInt(keywordPrice), price, link, image]);
                }
            }
        }
    }
    return processedListings;
}

// async function calculateSum(list, type) {
//     for ()
// }

module.exports = { processListings };