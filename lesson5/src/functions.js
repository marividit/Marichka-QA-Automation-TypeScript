function sum(array) {
    return array.reduce(function (acc, item) {
        return acc + item;
    });
}

const numbers = [1, 2, 3, 4, 5];
const strings = ["Привіт", " ", "світ"];

console.log(sum(numbers)); // 15
console.log(sum(strings)); // Привіт світ
