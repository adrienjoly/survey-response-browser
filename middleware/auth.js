var key = require('./survey-response-browser-2f4433c304e6.json') // TODO: keep your own file private / secret
var google = require('googleapis')

module.exports = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/drive'],
  null
)
