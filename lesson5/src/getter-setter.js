const student = {
    _name: 'Олег',
    age: 20,

    // Вкладений об'єкт (2-й рівень)
    address: {
        city: 'Львів',
        street: 'Шевченка'
    },

    // Гетер
    get name() {
        return 'Ім\'я: ' + this._name + ', Вік: ' + this.age;
    },

    // Сетер
    set name(value) {
        this._name = value;
    },

    // Метод
    getSummary: function () {
        return 'Студент ' + this._name + ' живе у ' + this.address.city + ' на вул. ' + this.address.street;
    }
};

// Читаємо через гетер
console.log(student.name); // Ім'я: Олег, Вік: 20

// Змінюємо через сетер
student.name = "Марія";
console.log(student.name); // Ім'я: Марія, Вік: 20

// Викликаємо метод
console.log(student.getSummary());
