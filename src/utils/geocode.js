const request=require('request')
const geocode=(address,callback)=>{
  const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1Ijoic2hydXRpLTIzIiwiYSI6ImNqdWg1aGx5djA0ZHc0Mm43ajI5Y2V2ODcifQ.bd9zqAzsOS9BQ46Yr20eEg&limit=1"
  request({url,json:true},(error,{body})=>{
    if(error){
       callback("Unable to connect to the location services!!",undefined)
     }else if(body.features.length==0){
       callback("Unable to find search.Try another search!!",undefined)
     }else {
       callback(undefined,{
         longitude:body.features[0].center[0],
         latitude:body.features[0].center[1],
         location:body.features[0].place_name
       })
     }
   })
 }

module.exports=geocode