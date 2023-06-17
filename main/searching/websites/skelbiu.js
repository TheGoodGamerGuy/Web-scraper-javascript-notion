const puppeteer = require('puppeteer');
const fs = require('fs');

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.49 Safari/537.36',
};

async function scrapeSkelbiu(mainLink) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders(headers);

    try {
        await page.goto(mainLink);
        await page.waitForSelector('li.simpleAds > a');

        const hrefs = await page.$$eval('li.simpleAds > a', anchors =>
            anchors.map(anchor => anchor.href)
        );

        const results = await Promise.all(
            hrefs.map(async href => {
                const itemPage = await browser.newPage();
                await itemPage.setExtraHTTPHeaders(headers);
                await itemPage.goto(href);

                let price = 99999999;
                let image = 'https://www.muskersbroughtonhall.com.au/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg';

                try {
                    const priceStr = await itemPage.$eval(
                        'p.price',
                        div => div.innerText.trim()
                    );
                    price = parseInt(priceStr.replace(/\D/g, ''));

                    image = await itemPage.$eval(
                        '#main-photo',
                        el => el.getAttribute('src')
                    );
                } catch (error) {

                }

                const itemTitle = await itemPage.$eval(
                    'div.item-title-container',
                    div => div.innerText.trim().split(/\s*\n\s*/).join()
                );
                const isHidden = await itemPage.$('div.item-description .description.hidden');

                const selector = isHidden ?
                    'div.item-description:not(.hidden) > :not(div.description.hidden)' :
                    'div.item-description:not(.hidden)';

                const itemDescription = await itemPage.$eval(
                    selector,
                    div => div.innerText.trim().split(/\s*\n\s*/).join()
                );

                const text = itemTitle + itemDescription;

                await itemPage.close();

                return [text, price, href, image];
            })
        );

        await page.close();
        await browser.close();

        return results;
    } catch (error) {
        const htmlContent = await page.evaluate(() => document.documentElement.outerHTML);
        fs.writeFile('error_page.html', htmlContent, err => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('HTML content saved to error_page.html');
            }
        });

        await page.close();
        await browser.close();

        throw error; // Rethrow the error to be caught by the caller
    }
}

module.exports = { scrapeSkelbiu };