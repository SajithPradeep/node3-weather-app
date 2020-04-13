const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=fbccdd6249f34c2c7f9fa1d330002cd0&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=m";

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback("Unable to process the request to weather api", undefined);
        } else if (body.error) {
            callback('Cannot find the weather for the place entered. Try again', undefined);
        } else {
            const {
                weather_descriptions,
                temperature,
                feelslike
            } = body.current;
            const weatherinfo = weather_descriptions[0] + ". It is currently " + temperature + " degree celcius. It feels like " + feelslike + " degrees out";
            callback(undefined, weatherinfo);
        }
    })
}

module.exports = forecast;