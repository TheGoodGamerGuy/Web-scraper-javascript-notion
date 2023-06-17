const axios = require('axios')
const fs = require('fs')
const cheerio = require('cheerio')

function datenow() {
    var currentDate = new Date()
    var year = currentDate.getFullYear()
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    var day = currentDate.getDate().toString().padStart(2, '0')
    var hour = currentDate.getHours().toString().padStart(2, '0')
    var minute = currentDate.getMinutes().toString().padStart(2, '0')
    var second = currentDate.getSeconds().toString().padStart(2, '0')

    var date = year + "-" + month + "-" + day + "_" + hour + "-" + minute + "-" + second
    return date
}


async function scrapeFbmarketplace(link) {
    let counter = 0;
    let success = false;

    while (counter < 10 && !success) {
        try {
            const url = `https://proxy.scrapeops.io/v1/?api_key=e083b022-acc2-4ed6-8c22-0aa26f559beb&url=${link}`;
            const html = await axios.get(url);

            const date = datenow();


            const $ = cheerio.load(html.data);
            const elements = $('.x3ct3a4');

            const results = [];

            elements.each((index, element) => {
                const priceElement = $(element).find('span.x1s688f');
                const priceStr = priceElement.text();
                const price = parseInt((priceStr.match(/\d+/) || [0])[0], 10);


                const textElement = $(element).find('div.xyqdw3p.x4uap5.xjkvuk6.xkhd6sd')
                const text = textElement.text();

                const hrefElement = $(element).find('a')
                const href = hrefElement.attr('href')

                const imageElement = $(element).find('img.xt7dq6l.xl1xv1r.x6ikm8r.x10wlt62.xh8yej3')
                const image = imageElement.attr('src')

                results.push([text, price, 'https://www.facebook.com/' + href, image]);
            });

            return results
        } catch (error) {
            console.log('error: ' + counter)
            console.log(error)
            counter++
            if (counter === 3) {
                console.error('Scraping failed after 3 attempts:', error);
                error = error;
                fs.writeFile(`./crash/facebook_${date}.html`, html.data, (err) => {
                    if (err) throw err;
                    console.log('saved crash html');
                });
                fs.writeFile(`./crash/facebook_${date}.txt`, error, (err) => {
                    if (err) throw err;
                    console.log('saved crash log');
                });
                return []
            }
        }
    }
}

// scrapeFbmarketplace('https://www.facebook.com/marketplace/111536985531661/search?query=canon')
//     .then(data => console.table(data))


module.exports = { scrapeFbmarketplace };