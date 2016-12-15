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

			// Fill with generic infos
			var rows = response.values
			var result = peopleFilledWithGenericInfos(rows)
			resolve(result)
		})
	})
}

/**
Create arrays of members and friends with infos found in the Mangrove Friends spreadsheet
*/
function peopleFilledWithGenericInfos(rows) {
	var friends = []
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i]
		if (row.length !== 0) {
			var person = {
				first_name: row[0],
				last_name: row[1],
				twitter: row[2],
				image: row[3]
			}
			if (row[4] == 0) { // friend
				friends.push(person)
			}
		}
	}
	return friends;
}

module.exports = {
	get: getPeople
}
