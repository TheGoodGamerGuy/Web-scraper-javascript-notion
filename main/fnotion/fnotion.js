const { exec } = require('child_process');
const fs = require('fs');
const { url } = require('inspector');

function fromNotion(arg) {
    const scriptPath = `${__dirname}/getnotiondata.py`;
    const command = `python ${scriptPath} ${arg}`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                console.error(`Error executing Python script: ${error}`);
                reject(error);
                return;
            }

            if (arg === 'links') {
                fs.readFile('data.csv', 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading the file:', err);
                        reject(err);
                        return;
                    }

                    const lines = data.split('\n').map(line => line.trim()).filter(Boolean);
                    const urls = lines.slice(1);
                    resolve(urls);
                });
            } else if (arg === 'keywords') {
                fs.readFile('data.csv', 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading the file:', err);
                        reject(err);
                        return;
                    }

                    const lines = data.split('\n').map(line => line.split(',').map(item => item.trim()));
                    const keywordsAndPrices = lines.slice(1).map(line => [line[1], line[3]]);
                    resolve(keywordsAndPrices);
                });
            } else if (arg === 'precise' || arg === 'broad') {
                fs.readFile('data.csv', 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading the file:', err);
                        reject(err)
                        return
                    }

                    const lines = data.split('\n').map(line => line.split(',').map(item => item.trim()));
                    const links = lines.slice(1).map(line => line[3]);
                    resolve(links)
                })
            }
        });
    });
}

module.exports = { fromNotion };