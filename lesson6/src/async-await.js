async function getUser() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await response.json();
    showUser(user);
}

function showUser(user) {
    console.log('Ім\'я: ' + user.name);
    console.log('Email: ' + user.email);
    console.log('Місто: ' + user.address.city);
}

getUser();
