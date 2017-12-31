/* eslint-env mocha */
'use strict';
const assert = require('assert');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const Vinyl = require('vinyl');
const regenerator = require('.');

it('should transpile with Regenerator', cb => {
	const stream = regenerator();

	stream.on('data', data => {
		assert(/regeneratorRuntime.mark/.test(data.contents.toString()));
		cb();
	});

	stream.end(new Vinyl({
		contents: fs.readFileSync('fixture.js')
	}));
});

it('should generate source maps', cb => {
	const init = sourceMaps.init();
	const write = sourceMaps.write();

	init
		.pipe(regenerator())
		.pipe(write);

	write.on('data', file => {
		const contents = file.contents.toString();
		assert.equal(file.sourceMap.sources[0], 'fixture.js');
		assert(/regeneratorRuntime.mark/.test(contents));
		assert(/sourceMappingURL=data:application\/json;charset=utf8;base64/.test(contents));
		cb();
	});

	init.end(new Vinyl({
		cwd: __dirname,
		base: __dirname,
		path: 'fixture.js',
		contents: fs.readFileSync('fixture.js'),
		sourceMap: ''
	}));
});
