'use strict';
var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var sourceMaps = require('gulp-sourcemaps');
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

it('should generate source maps', function (cb) {
	var init = sourceMaps.init();
	var write = sourceMaps.write();

	init
		.pipe(regenerator())
		.pipe(write);

	write.on('data', function (file) {
		var contents = file.contents.toString();
		assert.equal(file.sourceMap.sources[0], 'fixture.js');
		assert(/regeneratorRuntime.mark/.test(contents));
		assert(/sourceMappingURL=data:application\/json;base64/.test(contents));
		cb();
	});

	init.write(new gutil.File({
		cwd: __dirname,
		base: __dirname,
		path: 'fixture.js',
		contents: fs.readFileSync('fixture.js'),
		sourceMap: ''
	}));

	init.end();
});
