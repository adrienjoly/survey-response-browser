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

router.get('/:spreadsheetId/:index?', function(req, res, next) {
	responses.get(req.params.spreadsheetId, (err, responses) =>
		err
			? next(err)
			: res.render('index', genPage(select(responses, req.params.index)))
	)
})

module.exports = router
