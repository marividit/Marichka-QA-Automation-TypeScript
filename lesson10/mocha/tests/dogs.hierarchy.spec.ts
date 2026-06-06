import { expect } from 'chai';
import { GuardDog, ServiceDog, MixedBreedDog, introduceAnimal, introduceDog, introduceWorkingDog } from '../tests/dogs.hierarchy.two';

describe('GuardDog', () => {
    let rex: GuardDog;

    beforeEach(() => {
        rex = new GuardDog('Рекс', 3, 'німецька вівчарка');
    });

    it('should have correct name', () => {
        expect(rex.name).to.equal('Рекс');
    });

    it('should have correct age', () => {
        expect(rex.age).to.equal(3);
    });

    it('should have correct breed', () => {
        expect(rex.breed).to.equal('німецька вівчарка');
    });

    it('should have correct task', () => {
        expect(rex.task).to.equal('охорона території');
    });

    it('should call makeSound without errors', () => {
        expect(() => rex.makeSound()).to.not.throw();
    });

    it('should call fetch without errors', () => {
        expect(() => rex.fetch()).to.not.throw();
    });

    it('should call performTask without errors', () => {
        expect(() => rex.performTask()).to.not.throw();
    });
});

describe('ServiceDog', () => {
    let buddy: ServiceDog;

    beforeEach(() => {
        buddy = new ServiceDog('Бадді', 5, 'лабрадор');
    });

    it('should have correct name', () => {
        expect(buddy.name).to.equal('Бадді');
    });

    it('should have correct age', () => {
        expect(buddy.age).to.equal(5);
    });

    it('should have correct breed', () => {
        expect(buddy.breed).to.equal('лабрадор');
    });

    it('should have correct task', () => {
        expect(buddy.task).to.equal('допомога людям');
    });

    it('should call makeSound without errors', () => {
        expect(() => buddy.makeSound()).to.not.throw();
    });

    it('should call fetch without errors', () => {
        expect(() => buddy.fetch()).to.not.throw();
    });

    it('should call performTask without errors', () => {
        expect(() => buddy.performTask()).to.not.throw();
    });
});

describe('MixedBreedDog', () => {
    let misha: MixedBreedDog;

    beforeEach(() => {
        misha = new MixedBreedDog('Міша', 4, 'метис такси і пекінеса', 'ходити в гори');
    });

    it('should have correct name', () => {
        expect(misha.name).to.equal('Міша');
    });

    it('should have correct age', () => {
        expect(misha.age).to.equal(4);
    });

    it('should have correct breed', () => {
        expect(misha.breed).to.equal('метис такси і пекінеса');
    });

    it('should have correct hobby', () => {
        expect(misha.hobby).to.equal('ходити в гори');
    });

    it('should call makeSound without errors', () => {
        expect(() => misha.makeSound()).to.not.throw();
    });

    it('should call fetch without errors', () => {
        expect(() => misha.fetch()).to.not.throw();
    });

    it('should call showHobby without errors', () => {
        expect(() => misha.showHobby()).to.not.throw();
    });
});

describe('introduceAnimal', () => {
    it('should work with GuardDog', () => {
        const rex = new GuardDog('Рекс', 3, 'німецька вівчарка');
        expect(() => introduceAnimal(rex)).to.not.throw();
    });

    it('should work with ServiceDog', () => {
        const buddy = new ServiceDog('Бадді', 5, 'лабрадор');
        expect(() => introduceAnimal(buddy)).to.not.throw();
    });

    it('should work with MixedBreedDog', () => {
        const misha = new MixedBreedDog('Міша', 4, 'метис такси і пекінеса', 'ходити в гори');
        expect(() => introduceAnimal(misha)).to.not.throw();
    });
});

describe('introduceDog', () => {
    it('should work with GuardDog', () => {
        const rex = new GuardDog('Рекс', 3, 'німецька вівчарка');
        expect(() => introduceDog(rex)).to.not.throw();
    });

    it('should work with MixedBreedDog', () => {
        const misha = new MixedBreedDog('Міша', 4, 'метис такси і пекінеса', 'ходити в гори');
        expect(() => introduceDog(misha)).to.not.throw();
    });
});

describe('introduceWorkingDog', () => {
    it('should work with GuardDog', () => {
        const rex = new GuardDog('Рекс', 3, 'німецька вівчарка');
        expect(() => introduceWorkingDog(rex)).to.not.throw();
    });

    it('should work with ServiceDog', () => {
        const buddy = new ServiceDog('Бадді', 5, 'лабрадор');
        expect(() => introduceWorkingDog(buddy)).to.not.throw();
    });
});
