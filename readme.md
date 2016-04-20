# gulp-regenerator [![Build Status](https://travis-ci.org/sindresorhus/gulp-regenerator.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-regenerator)

> Transpile ES2015 generator functions to ES5 with [Regenerator](http://facebook.github.io/regenerator/)

*Issues with the output should be reported on the Regenerator [issue tracker](https://github.com/facebook/regenerator/issues).*


## Install

```
$ npm install --save-dev gulp-regenerator
```


## Usage

```js
var gulp = require('gulp');
var regenerator = require('gulp-regenerator');

gulp.task('default', function () {
	return gulp.src('src/app.js')
		.pipe(regenerator())
		.pipe(gulp.dest('dist'));
});
```


## API

### regenerator(options)

#### options.includeRuntime

Type: `boolean`  
Default: `false`

> A small runtime library (less than 1KB compressed) is required to provide the wrapGenerator function. You can install it either as a CommonJS module or as a standalone .js file, whichever you prefer.


## Source Maps

Use [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) like this:

```js
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var regenerator = require('gulp-regenerator');

gulp.task('default', function () {
	return gulp.src('src/app.js')
		.pipe(sourcemaps.init())
		.pipe(regenerator())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
});
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
