const { processListings } = require('./processing/processing')
const { fromNotion } = require('./fnotion/fnotion')

processListings('precise')
    .then(data => {
        console.log(data)
    });

// fromNotion('broad')
// .then(data => {
//     console.log(data)
// })


[
    [
        'Canon',
        200,
        39,
        'https://www.ss.com/msg/lv/electronics/photo-optics/objectives/cblbn.html',
        'https://i.ss.com/gallery/5/965/241170/48233992.th2.jpg'
    ],
    [
        'Canon',
        200,
        12,
        'https://www.skelbiu.lt/skelbimai/lp-e5-canon-450d-500d-1000d-rebel-xs-t1i-kiss-x2-67395114.html',
        'https://skelbiu-img.dgn.lt/1_18_3557757612/lp-e5-tinka-canon-450d-500d-1000d-rebel-xs.jpg'
    ],
    [
        'Canon Tinka',
        400,
        1800,
        'https://www.skelbiu.lt/skelbimai/lp-e6-canon-7d-6d-5d-mark-ii-iii-iv-5ds-60d-70d-67395388.html',
        'https://skelbiu-img.dgn.lt/1_18_3557766470/lp-e6-tinka-canon-7d-6d-5d-mark-ii-iii-iv-60d-70.jpg'
    ],
    [
        'Canon',
        200,
        1800,
        'https://www.skelbiu.lt/skelbimai/lp-e6-canon-7d-6d-5d-mark-ii-iii-iv-5ds-60d-70d-67395388.html',
        'https://skelbiu-img.dgn.lt/1_18_3557766470/lp-e6-tinka-canon-7d-6d-5d-mark-ii-iii-iv-60d-70.jpg'
    ],
    [
        'Canon mark II',
        350,
        1800,
        'https://www.skelbiu.lt/skelbimai/lp-e6-canon-7d-6d-5d-mark-ii-iii-iv-5ds-60d-70d-67395388.html',
        'https://skelbiu-img.dgn.lt/1_18_3557766470/lp-e6-tinka-canon-7d-6d-5d-mark-ii-iii-iv-60d-70.jpg'
    ],
    [
        'Canon',
        200,
        180,
        'https://www.andelemandele.lv/perle/3170526/canon-eos-1200d/',
        'https://static2.andelemandele.lv/images/252/99f/1/large/bb193c6c2db71972c.jpg'
    ],
    [
        'Canon',
        200,
        200,
        'https://www.andelemandele.lv/perle/8410832/canon-ef-70-200mm/',
        'https://static7.andelemandele.lv/images/e80/3df/1/large/550e5c619d1f542d0.jpg'
    ],
    [
        'Canon EF',
        250,
        200,
        'https://www.andelemandele.lv/perle/8410832/canon-ef-70-200mm/',
        'https://static7.andelemandele.lv/images/e80/3df/1/large/550e5c619d1f542d0.jpg'
    ],
    [
        'Canon',
        200,
        120,
        'https://www.andelemandele.lv/perle/8408386/canon-eos-100d/',
        'https://static4.andelemandele.lv/images/3b5/3a7/1/large/ebdc53a1a9f8515d6.jpg'
    ],
    [
        'Nikon OS',
        200,
        60,
        'https://www.andelemandele.lv/perle/7476650/nikon-f-400s/',
        'https://static7.andelemandele.lv/images/14e/c04/1/large/0f07e3f1701b577cb.jpg'
    ],
    [
        'Nikon',
        80,
        60,
        'https://www.andelemandele.lv/perle/7476650/nikon-f-400s/',
        'https://static7.andelemandele.lv/images/14e/c04/1/large/0f07e3f1701b577cb.jpg'
    ]
]