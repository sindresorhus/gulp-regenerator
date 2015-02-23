'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var regenerator = require('regenerator');
var recast = require('recast');
var applySourceMap = require('vinyl-sourcemaps-apply');

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
			var res;

			if (file.sourceMap) {
				var ast = regenerator.transform(recast.parse(file.contents.toString(), {
					sourceFileName: file.relative
				}), options);

				res = recast.print(ast, {
					sourceMapName: file.relative
				});
			} else {
				res = regenerator.compile(file.contents.toString(), options);
			}

			file.contents = new Buffer(res.code);

			if (res.map && file.sourceMap) {
				applySourceMap(file, res.map);
			}

			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-regenerator', err, {fileName: file.path}));
		}

		cb();
	});
};
