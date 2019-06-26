const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000


const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather Report',
    name:'SHRUTI GARG'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About',
    message:'Weather report gives you information about the current weather that is current temperature and this also provides you the information about the overall weather of the day.Minimum and maximum temperature is also shown.',
    name:'SHRUTI GARG'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
    name:'SHRUTI GARG',
    message:'Enter the location in search column to get weather report'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'Please provide an address'
    })
  }else {
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
      if(error)
      {
        return res.send({error})
      }
      forecast(latitude,longitude, (error, forecastData) => {
        if(error)
        {
          return res.send({error})
        }
        res.send({
        location:location,
        forecast:forecastData,
        address:req.query.address
      })
      })
    })
  }
})

app.get('/help/*',(req,res)=>{
  res.render('404page',{
    title:"Error",
    errormessage:"Help page not found",
    name:"SHRUTI GARG"
  })
})

app.get('*',(req,res)=>{
  res.render('404page',{
    title:'Error',
    errormessage:"404 page ",
    name:'SHRUTI GARG'
  })
})

app.listen(port,()=>{
  console.log("server is up on port" + port)
})
