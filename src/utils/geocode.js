const request = require('request')

const geocode = (address,callback)=>{
    const url = 'http://api.weatherapi.com/v1/current.json?key=bb9dfc8c27c04ee89e240329211701&q='+encodeURIComponent(address);
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to access the given location!',undefined)
        }
        else if(body.error){
            callback(body.error.message,undefined)
        }
        else{
            callback(undefined,{
                place: body.location.name+' '+body.location.region+' '+body.location.country,
                time: body.location.localtime,
                temperature: body.current.temp_c,
                cond: body.current.condition.text,
                icon_img: body.current.condition.icon,
                wind: body.current.wind_kph,
                humid: body.current.humidity,
                cloud: body.current.cloud
            })
        }
    })
}

module.exports = geocode