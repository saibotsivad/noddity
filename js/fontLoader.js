var ASQ = require('asynquence')
var http = require('http')
var url = require('url')

module.exports = function(fontUrls, cb) {
	if (typeof fontUrls === 'string') {
		fontUrls = [fontUrls]
	}

	var sequence = ASQ()

	var fns = fontUrls.map(function(font) {
		return function(done) {
			http.get(url.parse(font), function(res) {
				res.on('end', done)
			})
		}
	})

	sequence.gate.apply(sequence, fns).then(cb)

}
