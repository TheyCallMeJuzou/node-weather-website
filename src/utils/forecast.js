const request = require('postman-request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=2989823f078eb417417c59bee8f762c2&query=' + encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Could not connect to the weatherstack servers.',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else{
            callback(undefined,{
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
})
}
module.exports = forecast