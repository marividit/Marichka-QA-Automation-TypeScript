const student = {
    name: "Олег",
    age: 20,

    // Вкладений об'єкт (2-й рівень)
    address: {
        city: "Львів",
        street: "Шевченка"
    },

    // Гетер
    get info() {
        return "Ім'я: " + student.name + ", Вік: " + student.age;
    },

    // Сетер
    set newName(value) {
        student.name = value;
    },

    // Метод
    getSummary: function () {
        return "Студент " + student.name + " живе у " + student.address.city + " на вул. " + student.address.street;
    }
};

// Читаємо через гетер
console.log(student.info); // Ім'я: Олег, Вік: 20

// Змінюємо через сетер
student.newName = "Марія";
console.log(student.info); // Ім'я: Марія, Вік: 20

// Викликаємо метод
console.log(student.getSummary());
