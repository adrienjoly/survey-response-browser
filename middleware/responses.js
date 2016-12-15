var google = require('googleapis')
var auth = require('./auth.js')

/**
Get people from the Mangrove Friends spreadsheet
*/
function getPeople() {
	return new Promise(function (resolve, reject) {
		var sheets = google.sheets('v4')
		sheets.spreadsheets.values.get({
			auth: auth,
			spreadsheetId: '1ksK3vR4XF60SnegkSAjV3Q8SYHh-dgGUJDA4Y9RTBRE',
			range: 'WebsiteV2!A2:E'
		}, function(err, response) {
			// Error handler
			if (err) {
				reject(err)
				return
			}

			var rows = response.values
			var header = rows.shift()

			// turn each row into an object, based on header (column names)
			var results = rows.map((row) => Object.assign.apply(
				Object,
			  [ {} ].concat(
					header.map((key, i) => {
						var o = {};
						o[key] = row[i];
						return o;
					})
				)
			))
			resolve(results)
		})
	})
}

module.exports = {
	get: getPeople
}
