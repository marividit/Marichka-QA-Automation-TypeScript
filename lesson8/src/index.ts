import { MixedBreedDog } from './abstraction';

const misha = new MixedBreedDog('Міша', 4, 'дівчинка', 'метис такси і пекінеса', 'ходити в гори');
const rex = new MixedBreedDog('Рекс', 2, 'хлопчик', 'лабрадор', 'плавати');

misha.makeSound();
misha.fetch();
misha.showHobby();

rex.makeSound();
rex.fetch();
rex.showHobby();

misha.age = 5;
console.log(`Міші тепер ${misha.age} років`);

rex.hobby = 'бігати в парку';
rex.showHobby();

console.log(`${misha.name} старша за ${rex.name}: ${misha.age > rex.age}`);

misha.makeSound();
rex.makeSound();
