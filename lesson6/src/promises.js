function getUser() {
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(function (response) {
            return response.json();
        })
        .then(function (user) {
            showUser(user);
        });
}

function showUser(user) {
    console.log('Ім\'я: ' + user.name);
    console.log('Email: ' + user.email);
    console.log('Місто: ' + user.address.city);
}

getUser();
