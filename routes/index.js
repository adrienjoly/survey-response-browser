var express = require('express')
var responses = require('../middleware/responses.js')
var router = express.Router()

const meta = {
	urlPrefix: 'http://TODO',
	title: 'response browser',
	description: 'coucou',
	thumbnail: 'http://TODO.jpg',
	twitterUsername: '@adrienjoly',
}

const genPage = (responses) => Object.assign({}, meta, {
	responses: responses
})

const select = (responses, index) =>
	index !== undefined ? [ responses[index] ] : responses

function tap(fct) {
	return (err, res) => {
		console.log('=>', err || res)
		fct(err, res)
	}
}

router.get('/:spreadsheetId/:index?', function(req, res, next) {
	console.log('parsing spreadsheet:', req.params.spreadsheetId, '...');
	responses.get(req.params.spreadsheetId, tap((err, responses) =>
		err
			? next(err)
			: res.render('responses', genPage(select(responses, req.params.index)))
	))
})

module.exports = router
