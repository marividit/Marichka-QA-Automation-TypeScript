const sum = (array: number[] | string[]): number | string =>
    (array as number[]).reduce((acc, item) => (acc as number) + (item as number));

const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ['Привіт', ' ', 'світ'];

console.log(sum(numbers)); // 15
console.log(sum(strings)); // Привіт світ
