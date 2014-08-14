'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var regenerator = require('regenerator');

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			cb();
			return;
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-regenerator', 'Streaming not supported'));
			cb();
			return;
		}

		try {
			file.contents = new Buffer(regenerator(file.contents.toString(), options));
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-regenerator', err, {fileName: file.path}));
		}

		cb();
	});
};
