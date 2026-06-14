import sinon from 'sinon';
import { expect } from 'chai';

interface IAnimal {
    name: string;
    age: number;
    makeSound(): void;
}

interface IDog extends IAnimal {
    breed: string;
    fetch(): void;
}

interface IWorkingDog extends IDog {
    task: string;
    performTask(): void;
}

abstract class Animal implements IAnimal {
    public abstract name: string;
    public abstract age: number;
    public abstract makeSound(): void;
}

abstract class Dog extends Animal implements IDog {
    public abstract breed: string;
    public abstract fetch(): void;
}

abstract class WorkingDog extends Dog implements IWorkingDog {
    public abstract task: string;
    public abstract performTask(): void;
}

class GuardDog extends WorkingDog {
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

    public makeSound(): string {
        return `${this.name} гучно гавкає: ГАВ-ГАВ!`;
    }

    public fetch(): string {
        return `${this.name} приносить предмет`;
    }

    public performTask(): string {
        return `${this.name} охороняє територію`;
    }
}

class ServiceDog extends WorkingDog {
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

    public makeSound(): string {
        return `${this.name} тихо гавкає: гав`;
    }

    public fetch(): string {
        return `${this.name} подає предмет господарю`;
    }

    public performTask(): string {
        return `${this.name} допомагає людині з обмеженими можливостями`;
    }
}

class MixedBreedDog extends Dog {
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

    public makeSound(): string {
        return `${this.name} гавкає: Гав-гав!`;
    }

    public fetch(): string {
        return `${this.name} приносить мʼячик`;
    }

    public showHobby(): string {
        return `${this.name} обожнює ${this.hobby}`;
    }
}

function introduceAnimal(animal: IAnimal): void {
    console.log(`Імʼя: ${animal.name}`);
    console.log(`Вік: ${animal.age}`);
    animal.makeSound();
}

function introduceDog(dog: IDog): void {
    introduceAnimal(dog);
    console.log(`Порода: ${dog.breed}`);
    dog.fetch();
}

function introduceWorkingDog(dog: IWorkingDog): void {
    introduceDog(dog);
    console.log(`Завдання: ${dog.task}`);
    dog.performTask();
}

describe('Sinon spies — перевірка викликів методів', () => {
    let rex: GuardDog;
    let buddy: ServiceDog;
    let misha: MixedBreedDog;

    beforeEach(() => {
        rex = new GuardDog('Рекс', 3, 'німецька вівчарка');
        buddy = new ServiceDog('Бадді', 5, 'лабрадор');
        misha = new MixedBreedDog('Міша', 4, 'метис такси і пекінеса', 'ходити в гори');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('spy — makeSound викликається при introduceAnimal', () => {
        const spy = sinon.spy(rex, 'makeSound');

        introduceAnimal(rex);

        expect(spy.calledOnce).to.be.true;
    });

    it('spy — fetch викликається при introduceDog', () => {
        const spy = sinon.spy(misha, 'fetch');

        introduceDog(misha);

        expect(spy.calledOnce).to.be.true;
    });

    it('spy — performTask викликається при introduceWorkingDog', () => {
        const spy = sinon.spy(buddy, 'performTask');

        introduceWorkingDog(buddy);

        expect(spy.calledOnce).to.be.true;
    });
});

describe('Sinon stubs — заміна поведінки методів', () => {
    let rex: GuardDog;
    let misha: MixedBreedDog;

    beforeEach(() => {
        rex = new GuardDog('Рекс', 3, 'німецька вівчарка');
        misha = new MixedBreedDog('Міша', 4, 'метис такси і пекінеса', 'ходити в гори');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('stub — makeSound повертає замінене значення', () => {
        const stub = sinon.stub(rex, 'makeSound').returns('тихо');

        const result = rex.makeSound();

        expect(stub.calledOnce).to.be.true;
        expect(result).to.equal('тихо');
    });

    it('stub — fetch повертає замінене значення', () => {
        const stub = sinon.stub(misha, 'fetch').returns('не приносить нічого');

        const result = misha.fetch();

        expect(stub.calledOnce).to.be.true;
        expect(result).to.equal('не приносить нічого');
    });
});

describe('Sinon mocks — перевірка очікувань', () => {
    let buddy: ServiceDog;

    beforeEach(() => {
        buddy = new ServiceDog('Бадді', 5, 'лабрадор');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('mock — performTask викликається рівно один раз', () => {
        const mock = sinon.mock(buddy);
        mock.expects('performTask').once();

        introduceWorkingDog(buddy);

        mock.verify();
    });

    it('mock — makeSound і fetch викликаються при introduceDog', () => {
        const mock = sinon.mock(buddy);
        mock.expects('makeSound').once();
        mock.expects('fetch').once();

        introduceDog(buddy);

        mock.verify();
    });
});
