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
			file.contents = new Buffer(regenerator.compile(file.contents.toString(), options).code);
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-regenerator', err, {fileName: file.path}));
		}

		cb();
	});
};
