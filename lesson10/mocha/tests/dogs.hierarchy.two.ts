export interface IAnimal {
    name: string;
    age: number;
    makeSound(): void;
}

export interface IDog extends IAnimal {
    breed: string;
    fetch(): void;
}

export interface IWorkingDog extends IDog {
    task: string;
    performTask(): void;
}

export abstract class Animal implements IAnimal {
    public abstract name: string;
    public abstract age: number;
    public abstract makeSound(): void;
}

export abstract class Dog extends Animal implements IDog {
    public abstract breed: string;
    public abstract fetch(): void;
}

export abstract class WorkingDog extends Dog implements IWorkingDog {
    public abstract task: string;
    public abstract performTask(): void;
}

export class GuardDog extends WorkingDog {
    public name: string;
    public age: number;
    public breed: string;
    public task: string;

    public constructor(name: string, age: number, breed: string) {
        super();
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.task = 'охорона території';
    }

    public makeSound(): void {
        console.log(`${this.name} гучно гавкає: ГАВ-ГАВ!`);
    }

    public fetch(): void {
        console.log(`${this.name} приносить предмет`);
    }

    public performTask(): void {
        console.log(`${this.name} охороняє територію`);
    }
}

export class ServiceDog extends WorkingDog {
    public name: string;
    public age: number;
    public breed: string;
    public task: string;

    public constructor(name: string, age: number, breed: string) {
        super();
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.task = 'допомога людям';
    }

    public makeSound(): void {
        console.log(`${this.name} тихо гавкає: гав`);
    }

    public fetch(): void {
        console.log(`${this.name} подає предмет господарю`);
    }

    public performTask(): void {
        console.log(`${this.name} допомагає людині з обмеженими можливостями`);
    }
}

export class MixedBreedDog extends Dog {
    public name: string;
    public age: number;
    public breed: string;
    public hobby: string;

    public constructor(name: string, age: number, breed: string, hobby: string) {
        super();
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.hobby = hobby;
    }

    public makeSound(): void {
        console.log(`${this.name} гавкає: Гав-гав!`);
    }

    public fetch(): void {
        console.log(`${this.name} приносить мʼячик`);
    }

    public showHobby(): void {
        console.log(`${this.name} обожнює ${this.hobby}`);
    }
}

export function introduceAnimal(animal: IAnimal): void {
    console.log(`Імʼя: ${animal.name}`);
    console.log(`Вік: ${animal.age}`);
    animal.makeSound();
}

export function introduceDog(dog: IDog): void {
    introduceAnimal(dog);
    console.log(`Порода: ${dog.breed}`);
    dog.fetch();
}

export function introduceWorkingDog(dog: IWorkingDog): void {
    introduceDog(dog);
    console.log(`Завдання: ${dog.task}`);
    dog.performTask();
}

const misha = new MixedBreedDog('Міша', 4, 'метис такси і пекінеса', 'ходити в гори');
const rex = new GuardDog('Рекс', 3, 'німецька вівчарка');
const buddy = new ServiceDog('Бадді', 5, 'лабрадор');

console.log('=== Міша ===');
introduceDog(misha);

console.log('=== Рекс ===');
introduceWorkingDog(rex);

console.log('=== Бадді ===');
introduceWorkingDog(buddy);

console.log('=== Всі тварини через IAnimal ===');
const animals: IAnimal[] = [misha, rex, buddy];
animals.forEach((animal) => introduceAnimal(animal));
