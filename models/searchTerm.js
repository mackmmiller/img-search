const mongoose = require('mongoose'),
Schema         = mongoose.Schema;

const searchTermSchema = new Schema(
		{
			searchVal: String,
			searchDate: Date
		},
		{timestamp: true}
	);

const ModelClass = mongoose.model('searchTerm', searchTermSchema);

module.exports = ModelClass;