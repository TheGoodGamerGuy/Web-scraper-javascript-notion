const { processListings } = require('./processing/processing')


processListings('precise')
    .then(data => {
        console.log(data)
    });