var google = require('googleapis')
var key = require('./survey-response-browser-2f4433c304e6.json') // TODO: keep your own file private / secret

const auth = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/drive'],
  null
)

function getSheet(spreadSheetId, callback) {
	var sheets = google.sheets('v4')
	sheets.spreadsheets.get({
		auth: auth,
		spreadsheetId: spreadSheetId,
	}, function(err, sheet) {
		if (err) {
			callback(err)
		} else {
			var firstRange = sheet.sheets[0].properties.title // e.g. 'SampleSheet'
			sheets.spreadsheets.values.get({
				auth: auth,
				spreadsheetId: spreadSheetId, // e.g. '1Mfelh98MMmIAqusHi0u2ugoZWGhSjxnMI2GFVoVrRGo', for https://docs.google.com/spreadsheets/d/1Mfelh98MMmIAqusHi0u2ugoZWGhSjxnMI2GFVoVrRGo/edit?usp=sharing
				range: firstRange,
			}, callback)
		}
	})
}

function fetchResponses(spreadSheetId, callback) {
	getSheet(spreadSheetId, function(err, response) {
		// Error handler
		if (err) {
			callback(err)
			return
		}

		var rows = response.values
		var header = rows.shift()

		// turn each row into an object, based on header (column names)
		var results = rows.map((rowValues) => rowValues.map((v, i) => ({
			key: header[i],
			value: v,
		})))
		/*
		Object.assign.apply(
			Object,
			[ {} ].concat(
				header.map((key, i) => {
					var o = {}
					o[key] = row[i]
					return o
				})
			)
		))*/
		callback(null, results)
	})
}

module.exports = {
	get: fetchResponses
}
