const request=require('request')

const forecast=(latitude,longitude,callback)=>{
  const url="https://api.darksky.net/forecast/2d9931c43641fb94a897280b6471ab33/"+latitude+","+longitude+"?units=si"
  request({url,json:true},(error,{body})=>{
     if(error){
       callback("Unable to connect to the weather services!!",undefined)
    }else if(body.error){
      callback("Unable to find the location!",undefined)
    }else {
      callback(undefined,{
        summary:body.daily.data[0].summary,
        temperature:body.currently.temperature+'\xB0C',
        precipitation: body.currently.precipProbability +'% chance of rain',
        Minimum_temp:'Minimum Temperature '+body.daily.data[0].temperatureMin +'\xB0C',
        Maximum_temp :'Maximum Temperature '+ body.daily.data[0].temperatureMax+'\xB0C'
    })
    }
  })
}


module.exports=forecast
