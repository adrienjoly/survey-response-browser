var express = require('express')
var responses = require('../middleware/responses.js')
var router = express.Router()

const wording = {
	urlPrefix: 'http://TODO',
	title: 'response browser',
	description: 'coucou',
	thumbnail: 'http://TODO.jpg',
	twitterUsername: '@adrienjoly',
}

const wordingWith = (responses) => Object.assign({}, wording, {
	responses: responses
})

router.get('/:index?', function(req, res, next) {
	var index = req.params.index
	responses.get((err, responses) =>
		(err
			? next(err)
			: res.render('index', wordingWith(/* index !== '' ? [ responses[index] ] : */ responses))
		)
	)
})

module.exports = router
