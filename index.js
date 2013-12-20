'use strict';
var es = require('event-stream');
var regenerator = require('regenerator');

module.exports = function (options) {
	return es.map(function (file, cb) {
		file.contents = new Buffer(regenerator(file.contents.toString(), options));
		cb(null, file);
	});
};
