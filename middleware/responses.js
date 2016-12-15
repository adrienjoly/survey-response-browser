var google = require('googleapis')
var auth = require('./auth.js')

// URL of sample data spreadsheet: https://docs.google.com/spreadsheets/d/1Mfelh98MMmIAqusHi0u2ugoZWGhSjxnMI2GFVoVrRGo/edit?usp=sharing

/**
Get people from the Mangrove Friends spreadsheet
*/
function getPeople() {
	return new Promise(function (resolve, reject) {
		var sheets = google.sheets('v4')
		sheets.spreadsheets.values.get({
			auth: auth,
			spreadsheetId: '1Mfelh98MMmIAqusHi0u2ugoZWGhSjxnMI2GFVoVrRGo',
			range: 'WebsiteV2'
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
