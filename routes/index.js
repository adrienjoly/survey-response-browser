var express = require('express')
var responses = require('../middleware/responses.js')
var router = express.Router()

const wording = {
	urlPrefix: 'http://TODO',
	title: 'response browser',
	description: 'coucou',
	thumbnail: 'http://TODO.jpg',
	twitterUsername: '@adrienjoly',
	sections: []
}

router.get('/:index?', function(req, res, next) {
	var index = req.params.index

	responses.get().then(
		(responses) => res.render('index', Object.assign({}, wording, {
			reponses: index == '' ? responses : [ responses[index] ]
		})),
		(err) => next(err)
	)
})

module.exports = router
