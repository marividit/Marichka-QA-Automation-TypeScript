const a = 0;
const b = 10;
const c = -5;
const d = '1';
const e = 'hello';
const f = undefined;
const g = null;

if (typeof a === 'number') {
    console.log('a is a number');
}

if (isNaN(a / d)) {
    console.log(`${a / d} is not a number`);
} else {
    console.log(`${a / d} is a number`);
}

if (isNaN(e / b))
    console.log(`${e} / ${b} is not a number`);
else
    console.log(`${e} / ${b} is a number`);

if (f) {
    console.log('f is truthy');
} else if (f === null) {
    console.log('f is null');
} else {
    console.log('f is not truthy and not null');
}

if (g) {
    console.log('g is truthy');
} else if (g === null) {
    console.log('g is null');
} else {
    console.log('g is not truthy and not null');
}

if (f || d > 0) {
    console.log('f is truthy or d is greater than 0');
} else if ((a > 0 && d < 0) || !f) {
    console.log('a is greater than 0 and d is less than 0 or f is falsy');
}

if (b > 0 && c < 0) {
    console.log('b is positive and c is negative');
} else if (b > 0 || c > 0) {
    console.log('at least one of b or c is positive');
} else {
    console.log('both b and c are non-positive');
}

if (typeof e === 'string' && e.length > 3) {
    console.log(`${e} is a string longer than 3 characters`);
} else if (typeof e === 'string') {
    console.log(`${e} is a short string`);
} else {
    console.log('e is not a string');
}
