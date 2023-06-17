const { fromNotion } = require('../fnotion/fnotion');

async function toNotion(type, list) {
    if (type === 'precise') {
        databaseId = '7029bd8b173e4f189ef31771e407fc43'
    } else if (type === 'broad') {
        databaseId = '7daf62afa9fd4271ad4d60364a59ca6d'
    }
    const headers = {
        "Authorization": "Bearer secret_AfnHl5IYviY2wdG2dqpamJaGTnnBETCtfgbKo0JDpza",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    }

    const createUrl = 'https://api.notion.com/v1/pages';
    const newPageData = {
        "cover": {
            "type": "external",
            "external": {
                "url": list[4]
            }
        },
        "parent": { "database_id": databaseId },
        "properties": {
            "listing price": {
                "type": "number",
                "number": list[2]
            },
            "keyword price": {
                "type": "number",
                "number": list[1]
            },
            "link": {
                "type": "url",
                "url": list[3]
            },
            "keyword": {
                "title": [{
                    "text": {
                        "content": list[0],
                        "link": null
                    },
                }]
            }
        }
    };
    const data = JSON.stringify(newPageData);
    const res = await fetch(createUrl, {
        method: 'POST',
        headers,
        body: data,
    });
    return await res.json();
}

// toNotion('7029bd8b173e4f189ef31771e407fc43', ['Canon', 200, 5, 'https://www.ss.com/msg/lv/electronics/photo-optics/accessories/cibjd.html', 'https://i.ss.com/gallery/6/1048/261820/52363814.th2.jpg'])
//     .then(data => console.log(data))

async function checkDuplicates(type, list) {
    const existingLinks = await fromNotion(type)
        // console.log(existingLinks)
    const uniqueList = list.filter(item => {
        const link = item[3]
        return !existingLinks.includes(link)
    });

    return uniqueList;
}

module.exports = { toNotion, checkDuplicates }