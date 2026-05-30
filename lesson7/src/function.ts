function calculate(values: number[] | string[]): number | string {
    return (values as number[]).reduce((acc, item) => (acc as number) + (item as number));
}

const prices: number[] = [10, 20, 30, 40, 50];
const words: string[] = ['Гарного', ' ', 'дня!'];

console.log(calculate(prices)); // 150
console.log(calculate(words));  // Гарного дня!
