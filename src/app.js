const express = require('express')
const path = require('path') 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherForecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)

const app = express()

// defining path for express config
const publicDirectoryPath = path.join('__dirname','../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=> {
	res.render('index',{
		title: 'Weather',
		name: 'Abhinav Deshmukh'
	})
})

app.get('/about',(req,res)=>{
	res.render('about',{
		title: 'About Me',
		name: 'Abhinav Deshmukh'
	})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		helpText: 'This is some helpful text',
		title: 'Help',
		name: 'Abhinav Deshmkh'
	})
})

app.get('/help/*',(req,res)=>{
	res.render('404page',{
		title: 'Error',
		errormessage: "Help article not found!",
		name: 'Abhinav Deshmukh'
	})
})

app.get('/weather',(req,res)=>{     
	// res.send('<h1>Weather</h1>')
	if(!req.query.address){
		res.send({
			error: 'Please enter an address for finding weather reports!'
		})
	}

	geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
		if(error){
			res.send({error})
		}

		weatherForecast(latitude,longitude,(error, forecastData)=>{
			if(error){
				res.send({error})
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
	})
})

app.get('/products',(req, res)=>{
	res.send({
		products: []
	})
})

app.get('*',(req,res)=>{
	res.render('404page',{
		title: 'Error',
		errormessage: "Page not Found!",
		name: 'Abhinav Deshmukh'
	})
})


app.listen(3000,()=> {
	console.log('Server is up on port 3000')
})