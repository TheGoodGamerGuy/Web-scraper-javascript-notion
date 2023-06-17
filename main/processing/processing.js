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

function calculateSum(list) {
    const result = [];
    const grouped = {};

    for (const item of list) {
        const [keywords, keywordPrice, listingPrice, link, image] = item;
        const key = `${listingPrice}-${link}-${image}`;

        if (key in grouped) {
            grouped[key][0].push(keywords);
            grouped[key][1] += keywordPrice;
        } else {
            grouped[key] = [
                [keywords], keywordPrice, listingPrice, link, image
            ];
        }
    }

    for (const key in grouped) {
        const [allKeywords, keywordPriceSum, listingPrice, link, image] = grouped[key];
        result.push([allKeywords.join('; '), keywordPriceSum, listingPrice, link, image]);
    }

    return result;
}



module.exports = { processListings, calculateSum };