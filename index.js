'use strict';
const through = require('through2');
const regenerator = require('regenerator');
const recast = require('recast');
const applySourceMap = require('vinyl-sourcemaps-apply');
const PluginError = require('plugin-error');
const Buffer = require('safe-buffer').Buffer;

module.exports = options => {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new PluginError('gulp-regenerator', 'Streaming not supported'));
			return;
		}

		try {
			let res;

			if (file.sourceMap) {
				const ast = regenerator.transform(recast.parse(file.contents.toString(), {
					sourceFileName: file.relative
				}), options);

				res = recast.print(ast, {
					sourceMapName: file.relative
				});
			} else {
				res = regenerator.compile(file.contents.toString(), options);
			}

			file.contents = Buffer.from(res.code);

			if (res.map && file.sourceMap) {
				applySourceMap(file, res.map);
			}

			this.push(file);
		} catch (err) {
			this.emit('error', new PluginError('gulp-regenerator', err, {fileName: file.path}));
		}

		cb();
	});
};
