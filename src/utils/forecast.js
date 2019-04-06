const request = require('request')

const weather = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/c8d6093be8b8d894fd10d858f9bcc18b/' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + '?units=si'

    request({url, json: true}, (error, {body} = response) => {
        if(error){
            callback('Unable to connect to weather service!!', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rainProb: body.currently.precipProbability,
                tempHigh: body.daily.data[0].temperatureHigh,
                tempLow: body.daily.data[0].temperatureLow
            })
        }
    })
}


module.exports = {
    weather: weather
}