const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)

const app = express()

// for static page
//for dynamic page

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shekhar Saikia'
    })
})

app.get('/about', (req, res) => {  //route
    res.render('about', {
        title: 'About Me',
        name: 'Shekhar Saikia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
      title: 'Help',
      name: 'Shekhar Saikia',
      helpText: 'God helps them those who help themselves'  
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter an address!'
        })
    }
    
    geocode.geocodeFunc(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast.weather(latitude, longitude, (error, /*{summary, temperature, rainProb} =*/ forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            //summary + ' The temperature is ' + temperature + '. The probability for rain is ' + rainProb + '.'
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must enter a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errText: 'Help article not found!',
        name: 'Shekhar Saikia'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errText: '404 Not Found',
        name: 'Shekhar Saikia'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})