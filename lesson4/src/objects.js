// Комплексний об'єкт — студент
const student = {
    name: "Маркіянчик",
    age: 20,

    // Вкладений об'єкт (2-й рівень ієрархії)
    address: {
        city: "Львів",
        street: "Шевченка",
        house: 12
    },

    grades: [90, 85, 78, 92, 88],

    getInfo: function () {
        console.log("Ім'я: " + student.name);
        console.log("Вік: " + student.age);
        console.log("Місто: " + student.address.city);
        console.log("Вулиця: " + student.address.street + ", " + student.address.house);
        console.log("Оцінки: " + student.grades);
    }
};

student.getInfo();
