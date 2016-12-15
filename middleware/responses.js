var google = require('googleapis')
var key = require('./survey-response-browser-2f4433c304e6.json') // TODO: keep your own file private / secret

const auth = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/drive'],
  null
)

// URL of sample data spreadsheet: https://docs.google.com/spreadsheets/d/1Mfelh98MMmIAqusHi0u2ugoZWGhSjxnMI2GFVoVrRGo/edit?usp=sharing

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
