const sum = (array: number[] | string[]): number | string => {
    if (typeof array[0] === 'number') {
        return (array as number[]).reduce((acc, item) => acc + item);
    }
    return (array as string[]).reduce((acc, item) => acc + item);
};

const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ['Привіт', ' ', 'світ'];

console.log(sum(numbers)); // 15
console.log(sum(strings)); // Привіт світ

