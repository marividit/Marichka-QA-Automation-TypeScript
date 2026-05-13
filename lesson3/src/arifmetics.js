
const num1 = 10;           // number (ціле)
const num2 = 3.5;          // number (дробове)
const str1 = 'Hello';      // string
const str2 = '5';          // string (число у вигляді рядка)
const bool1 = true;        // boolean
const bool2 = false;       // boolean
const nothing = null;      // null
const empty = undefined;   // undefined

console.log('=== Number + Number ===');
console.log('num1 + num2 =', num1 + num2);   // 13.5
console.log('num1 - num2 =', num1 - num2);   // 6.5
console.log('num1 * num2 =', num1 * num2);   // 35
console.log('num1 / num2 =', num1 / num2);   // 2.857...
console.log('num1 % num2 =', num1 % num2);   // 3
console.log('num1 ** 2   =', num1 ** 2);     // 100

console.log('\n=== String + String ===');
console.log('str1 + str2 =', str1 + str2);
console.log('str1 + " World" =', str1 + ' World');

console.log('\n=== Number + String ===');
console.log('num1 + str2 =', num1 + str2);   // '105' — конкатенація
console.log('num1 - str2 =', num1 - str2);   // 5 — рядок '5' конвертується в число
console.log('num1 * str2 =', num1 * str2);   // 50
console.log('num1 / str2 =', num1 / str2);   // 2

console.log('\n=== Number + Boolean ===');
console.log('num1 + true  =', num1 + bool1);  // 11 (true = 1)
console.log('num1 + false =', num1 + bool2);  // 10 (false = 0)
console.log('num1 * true  =', num1 * bool1);  // 10
console.log('num2 - false =', num2 - bool2);  // 3.5

console.log('\n=== Number + null ===');
console.log('num1 + null =', num1 + nothing);  // 10 (null = 0)
console.log('num1 * null =', num1 * nothing);  // 0

console.log('\n=== String + Boolean ===');
console.log('str1 + true  =', str1 + bool1);  // 'Hellotrue'
console.log('str1 + false =', str1 + bool2);  // 'Hellofalse'

console.log('\n=== Number + undefined ===');
console.log('num1 + undefined =', num1 + empty);  // NaN
console.log('num1 * undefined =', num1 * empty);  // NaN

console.log('\n=== NaN ===');
const nanValue = NaN;
console.log('typeof NaN =', typeof nanValue);            // 'number' — NaN є типом number
console.log('NaN + num1 =', nanValue + num1);            // NaN — будь-яка операція з NaN дає NaN
console.log('NaN * num2 =', nanValue * num2);            // NaN
console.log('isNaN("Hello") =', isNaN('Hello'));         // true — рядок не можна перетворити в число
console.log('isNaN("5") =', isNaN('5'));                 // false — рядок '5' можна перетворити в число
console.log('Number("Hello") =', Number('Hello'));       // NaN — конвертація нечислового рядка дає NaN
