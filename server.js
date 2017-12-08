// ==========
// Variables
// ==========
const express = require('express'),
app           = express(),
bodyParser    = require('body-parser'),
cors          = require('cors'),
mongoose      = require('mongoose'),
Bing          = require('node-bing-api')({accKey: ''});

app.use(bodyParser.json());
app.use(cors());

app.get('/api/imagesearch/:searchVal*', (req, res, next)=>{
	var { searchVal } = req.params;
	var {offset} = req.query;

	return res.json({
		searchVal,
		offset
	});
});

app.listen(process.env.PORT||3000, ()=>{
	console.log('Server is running');
});