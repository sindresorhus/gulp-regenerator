'use strict';
var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var regenerator = require('./');

it('should transpile with Regenerator', function (cb) {
	var stream = regenerator();

	stream.on('data', function (data) {
		assert(/regeneratorRuntime.mark/.test(data.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		contents: fs.readFileSync('fixture.js')
	}));
});
