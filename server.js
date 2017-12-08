// ==========
// Variables
// ==========
const express = require('express'),
app           = express(),
bodyParser    = require('body-parser'),
cors          = require('cors'),
mongoose      = require('mongoose'),
//util          = require('util'),
Bing          = require('node-bing-api')(
		{
			accKey: '4b56815dc5be40eda4d1621864ce9223',
		}
	),
searchTerm    = require('./models/searchTerm.js');

app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://admin:admin@ds133876.mlab.com:33876/img-search', {
	useMongoClient: true
});

app.get('/api/latestsearches', (req, res, next) => {
	searchTerm.find({}, (err, data) => {
		res.json(data);
	});
});
              
app.get('/api/imagesearch/:searchVal*', (req, res, next)=>{
	var { searchVal } = req.params;
	var {offset} = req.query;

	var data = new searchTerm({
		searchVal,
		searchDate: new Date()
	});

	// Save to latest searches
	data.save(err => {
		if (err) {
			res.send('Error');
		}

	});

	Bing.images(searchVal, {
		count: 10
	}, function(error, response, body) {
		var bingData=[];
		
		for(let i=0; i<10; i++) {
			bingData.push({
				url: body.value[i].webSearchUrl,
				snippet: body.value[i].name,
				thumbnail: body.value[i].thumbnailUrl,
				context: body.value[i].hostPageDisplayUrl
			});
		}
		res.json(bingData);
	});
});

app.listen(process.env.PORT||3000, ()=>{
	console.log('Server is running');
});