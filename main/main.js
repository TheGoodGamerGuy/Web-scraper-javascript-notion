const { processListings, calculateSum } = require('./processing/processing')
const { toNotion, checkDuplicates } = require('./tnotion/tnotion')




async function main(type) {

    const data = await processListings(type)
    const result = calculateSum(data);
    const clean = await checkDuplicates(type, result)

    for (const listing of clean) {
        toNotion(type, listing)
        console.log(listing)
    }
}

main("broad")



// toNotion('broad', ['Canon', 200, 5, 'https://www.ss.com/msg/lv/electronics/photo-optics/accessories/cibjd.html', 'https://i.ss.com/gallery/6/1048/261820/52363814.th2.jpg'])
//     .then(data => console.log(data))