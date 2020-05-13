//============= Set Up =============//
const express 		= require('express');
const app 			= express();
const bodyParser	= require('body-parser')

const config 	= require('./app/config');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
//route
const routes 	= require('./routes')(express);

app.use('/', routes);

app.listen(config.port);
console.log(`Running on port ${config.port}`);