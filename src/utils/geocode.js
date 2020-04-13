const request = require('request');

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2FqdGhlbGlndCIsImEiOiJjazh0MjkycTMwbnFjM2xwNmpxOG8zNzM5In0.gMaYpe__yH6dfRMV7DGV3g&limit=1";
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to Connect to Geocode API', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find the Location. Try Again', undefined)
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode;