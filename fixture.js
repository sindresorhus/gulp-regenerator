'use strict';

function *range(max, step) {
	let count = 0;
	step = step || 1;

	for (let i = 0; i < max; i += step) {
		count++;
		yield i;
	}

	return count;
}

const gen = range(20, 3);

let info;
while (!(info = gen.next()).done) {
	console.log(info.value);
}

console.log(`Steps taken: ${info.value}`);
