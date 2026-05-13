const animal = 'cat';

switch (animal) {
    case 'cat':
        console.log('This is a cat');
        break;
    case 'dog': {
        console.log('This is a dog');
        break;
    }
    case 'parrot':
        console.log('This is a parrot');
        break;
    default:
        console.log('Unknown animal');
}

switch (animal) {
    case 'cat':
        console.log('This is a cat');
        break;
    case 'dog': {
        console.log('This is a dog');
        break;
    }
    default:
        console.log('Unknown animal');
}

const number = 1;

switch (number) {
    case '1':
        console.log('This is number 1 as string');
        break;
    case 1:
        console.log('This is number 1');
        break;
    case 2:
        console.log('This is number 2');
        break;
    default:
        console.log('Unknown number');
}

const day = 3;

switch (day) {
    case 1:
        console.log('Monday');
        break;
    case 2:
        console.log('Tuesday');
        break;
    case 3:
        console.log('Wednesday');
        break;
    case 4:
        console.log('Thursday');
        break;
    case 5:
        console.log('Friday');
        break;
    case 6:
    case 7:
        console.log('Weekend');
        break;
    default:
        console.log('Unknown day');
}
