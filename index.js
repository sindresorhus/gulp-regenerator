'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var regenerator = require('regenerator');

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-regenerator', 'Streaming not supported'));
			return;
		}

		try {
			file.contents = new Buffer(regenerator(file.contents.toString(), options));
			cb(null, file);
		} catch (err) {
			cb(new gutil.PluginError('gulp-regenerator', err, {fileName: file.path}));
		}
	});
};
