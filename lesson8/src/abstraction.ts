export abstract class Animal {
    public abstract name: string;
    public abstract age: number;
    public abstract gender: string;

    public abstract makeSound(): void;
}

export abstract class Dog extends Animal {
    public abstract breed: string;

    public abstract fetch(): void;
}

export class MixedBreedDog extends Dog {
    public name: string;
    public age: number;
    public gender: string;
    public breed: string;
    public hobby: string;

    public constructor(name: string, age: number, gender: string, breed: string, hobby: string) {
        super();
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.breed = breed;
        this.hobby = hobby;
    }

    public makeSound(): void {
        console.log(`${this.name} гавкає: Гав-гав!`);
    }

    public fetch(): void {
        console.log(`${this.name} приносить мʼячик!`);
    }

    public showHobby(): void {
        console.log(`${this.name} обожнює ${this.hobby}`);
    }
}

function showAnimalInfo(animal: Animal): void {
    console.log(`Імʼя: ${animal.name}`);
    console.log(`Вік: ${animal.age} роки`);
    console.log(`Стать: ${animal.gender}`);
    animal.makeSound();
}

function showDogInfo(dog: MixedBreedDog): void {
    showAnimalInfo(dog);
    console.log(`Порода: ${dog.breed}`);
    dog.fetch();
    dog.showHobby();
}

const misha = new MixedBreedDog('Міша', 4, 'дівчинка', 'метис такси і пекінеса', 'ходити в гори');
const rex = new MixedBreedDog('Рекс', 2, 'хлопчик', 'лабрадор', 'плавати');

showDogInfo(misha);
console.log('---');
showDogInfo(rex);
