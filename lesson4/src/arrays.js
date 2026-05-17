// МАСИВ 1 — рядки (string)
const strings = ["банан", "яблуко", "вишня", "груша", "апельсин"];

console.log("=== Рядки ===");
console.log("forEach:");
strings.forEach(function (item) {
    console.log(item);
});

console.log("map (великі літери):");
const upper = strings.map(function (item) {
    return item.toUpperCase();
});
console.log(upper);

console.log("filter (довжина > 5):");
const longWords = strings.filter(function (item) {
    return item.length > 5;
});
console.log(longWords);

console.log("find (починається на 'я'):");
const found = strings.find((item) => item[0] === 'я});
console.log(found);

console.log("indexOf('вишня'):");
console.log(strings.indexOf("вишня"));

console.log("sort:");
const sorted = [...strings].sort();
console.log(sorted);

console.log("concat:");
const more = ["манго", "ківі"];
console.log(strings.concat(more));

console.log("reduce (одне речення):");
const sentence = strings.reduce(function (acc, item) {
    return acc + ", " + item;
});
console.log(sentence);

console.log("groupBy (за першою літерою):");
const groupedStrings = strings.reduce(function (acc, item) {
    const key = item[0];
    if (acc[key]) {
        acc[key].push(item);
    } else {
        acc[key] = [item];
    }
    return acc;
}, {});
console.log(groupedStrings);


// МАСИВ 2 — числа
const numbers = [3, 7, 1, 5, 9, 2, 8, 4, 6, 10];

console.log("\n=== Числа ===");
console.log("forEach:");
numbers.forEach(function (num) {
    console.log(num);
});

console.log("map (x2):");
const doubled = numbers.map(function (num) {
    return num * 2;
});
console.log(doubled);

console.log("filter (парні):");
const even = numbers.filter(function (num) {
    return num % 2 === 0;
});
console.log(even);

console.log("find (перше > 6):");
console.log(numbers.find(function (num) {
    return num > 6;
}));

console.log("indexOf(5):");
console.log(numbers.indexOf(5));

console.log("sort (за зростанням):");
const sortedNums = [...numbers].sort(function (a, b) {
    return a - b;
});
console.log(sortedNums);

console.log("concat:");
console.log(numbers.concat([11, 12, 13]));

console.log("reduce (сума):");
const sum = numbers.reduce(function (acc, num) {
    return acc + num;
}, 0);
console.log(sum);

console.log("groupBy (парні / непарні):");
const groupedNumbers = numbers.reduce(function (acc, num) {
    const key = num % 2 === 0 ? "парні" : "непарні";
    if (acc[key]) {
        acc[key].push(num);
    } else {
        acc[key] = [num];
    }
    return acc;
}, {});
console.log(groupedNumbers);


// МАСИВ 3 — булеві значення
const booleans = [true, false, true, true, false, false, true];

console.log("\n=== Булеві ===");
console.log("forEach:");
booleans.forEach(function (val) {
    console.log(val);
});

console.log("map (інверсія):");
const inverted = booleans.map(function (val) {
    return !val;
});
console.log(inverted);

console.log("filter (тільки true):");
console.log(booleans.filter(function (val) {
    return val === true;
}));

console.log("find (перший false):");
console.log(booleans.find(function (val) {
    return val === false;
}));

console.log("indexOf(false):");
console.log(booleans.indexOf(false));

console.log("sort (false першими):");
console.log([...booleans].sort(function (a, b) {
    return a - b;
}));

console.log("concat:");
console.log(booleans.concat([false, true]));

console.log("reduce (кількість true):");
const trueCount = booleans.reduce(function (acc, val) {
    return val === true ? acc + 1 : acc;
}, 0);
console.log(trueCount);

console.log("groupBy (true / false):");
const groupedBooleans = booleans.reduce(function (acc, val) {
    const key = String(val);
    if (acc[key]) {
        acc[key].push(val);
    } else {
        acc[key] = [val];
    }
    return acc;
}, {});
console.log(groupedBooleans);


// МАСИВ 4 — змішаний (any)
const mixed = [42, "привіт", true, null, "світ", 7, false, "привіт", null, 99];

console.log("\n=== Змішаний (any) ===");
console.log("forEach:");
mixed.forEach(function (item) {
    console.log(item);
});

console.log("map (все у рядок):");
console.log(mixed.map(function (item) {
    return String(item);
}));

console.log("filter (без null):");
console.log(mixed.filter(function (item) {
    return item !== null;
}));

console.log("find (перший рядок):");
console.log(mixed.find(function (item) {
    return typeof item === "string";
}));

console.log("indexOf('привіт'):");
console.log(mixed.indexOf("привіт"));

console.log("sort:");
console.log([...mixed].sort(function (a, b) {
    return String(a).localeCompare(String(b));
}));

console.log("concat:");
console.log(mixed.concat(["ще", 0]));

console.log("reduce (кількість за типом):");
const typeCounts = mixed.reduce(function (acc, item) {
    const key = item === null ? "null" : typeof item;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
}, {});
console.log(typeCounts);

console.log("groupBy (за типом):");
const groupedMixed = mixed.reduce(function (acc, item) {
    const key = item === null ? "null" : typeof item;
    if (acc[key]) {
        acc[key].push(item);
    } else {
        acc[key] = [item];
    }
    return acc;
}, {});
console.log(groupedMixed);
