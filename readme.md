# [gulp](https://github.com/wearefractal/gulp)-regenerator [![Build Status](https://secure.travis-ci.org/sindresorhus/gulp-regenerator.png?branch=master)](http://travis-ci.org/sindresorhus/gulp-regenerator)

> Transpile ES6 generator functions to ES5 with [Regenerator](http://facebook.github.io/regenerator/)

*Issues with the output should be reported on the [Regenerator issue tracker](https://github.com/facebook/regenerator/issues).*


## Install

Install with [npm](https://npmjs.org/package/gulp-regenerator)

```
npm install --save-dev gulp-regenerator
```


## Example

```js
var gulp = require('gulp');
var regenerator = require('gulp-regenerator');

gulp.task('default', function () {
	gulp.src('src/app.js')
		.pipe(regenerator())
		.pipe(gulp.dest('dist/app.js'));
});
```


## API

### regenerator(options)

#### options.includeRuntime

Type: `Boolean`  
Default: `false`

> A small runtime library (less than 1KB compressed) is required to provide the wrapGenerator function. You can install it either as a CommonJS module or as a standalone .js file, whichever you prefer.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
