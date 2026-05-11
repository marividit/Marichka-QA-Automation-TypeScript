const a = 0;
const b = 1;
const c = 'str';
const d = '1';
const e = 'str';
const f = true;
const g = false;
const h = undefined;
const i = null;

// Порівняння
console.log(a > b);
console.log(a < b);
console.log(a >= b);
console.log(a <= b);
console.log(b === d);   // false — різні типи
console.log(b == d);    // true — '1' конвертується в 1
console.log(a !== d);
console.log(a != d);
console.log(c === d);
console.log(c === e);

// Логічні оператори
console.log(f && g);
console.log(f || g);
console.log(!f);
console.log(!g);

// Nullish coalescing
const j = h ?? i ?? 'default value';
console.log(j);
