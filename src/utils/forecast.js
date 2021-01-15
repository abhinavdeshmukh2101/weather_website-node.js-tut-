const request = require('request')
const chalk = require('chalk')


const weatherForecast = (latitude,longitude,callback)=> {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=b8e4e48b09ee6509b0c1babdadb728fe'
    request({url,json:true},(error,{body})=> {
        if(error){
            callback('Unable to access the weather service!!',undefined)
        }
        else if(body.message){
            callback('Unable to find the location!',undefined)
        }
        else{
            callback(undefined,'temperature: '+body.main.temp+'\nforecast :'+body.weather[0].description)
        }
    })
}


module.exports = weatherForecast

