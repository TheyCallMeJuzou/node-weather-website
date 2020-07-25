const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000 //for heroku
// Define paths for express config
const pubdir = path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs') //app.set -> express setting
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubdir))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Tobias'
    }) 
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Tobias'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg: 'This is the help message',
        title: 'Help',
        name: 'Tobias'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,{temperature,feelslike,description,humidity} = {})=>{
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                temperature,
                feelslike,
                description,
                location,
                humidity
            })
        })

    })
})

    

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        msg:'Help article not found!',
        name: 'Tobias'
    })
})

app.get('*',(req,res)=>{ //* wildcard -> match anything that hastn match
    res.render('404',{
        title: '404',
        msg: 'Page not found',
        name: 'Tobias'
    })
})
app.listen(port, () =>{
    console.log('Server is up on port '+port)
})