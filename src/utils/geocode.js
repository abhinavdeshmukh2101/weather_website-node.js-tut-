const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaW5hdi0yMTAxIiwiYSI6ImNrajBhems1ZjJpdncydW1tZ3F2djlrOHAifQ.0HkImM5UFWnP_cUD1n0lVg'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to access the given location!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to connect to internet!',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}


module.exports = geocode