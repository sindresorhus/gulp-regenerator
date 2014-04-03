# [gulp](http://gulpjs.com)-regenerator [![Build Status](https://travis-ci.org/sindresorhus/gulp-regenerator.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-regenerator)

> Transpile ES6 generator functions to ES5 with [Regenerator](http://facebook.github.io/regenerator/)

*Issues with the output should be reported on the Regenerator [issue tracker](https://github.com/facebook/regenerator/issues).*


## Install

```bash
$ npm install --save-dev gulp-regenerator
```


## Usage

```js
var gulp = require('gulp');
var regenerator = require('gulp-regenerator');

gulp.task('default', function () {
	gulp.src('src/app.js')
		.pipe(regenerator())
		.pipe(gulp.dest('dist'));
});
```


## API

### regenerator(options)

#### options.includeRuntime

Type: `Boolean`  
Default: `false`

> A small runtime library (less than 1KB compressed) is required to provide the wrapGenerator function. You can install it either as a CommonJS module or as a standalone .js file, whichever you prefer.


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
