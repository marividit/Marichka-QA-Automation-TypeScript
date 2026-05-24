async function getUser() {
    try {
        const response = await fetch('https://this-site-does-not-exist.com/users/1');
        const user = await response.json();
        console.log('Ім\'я: ' + user.name);

    } catch (error) {
        console.log('Перший запит не вдався: ' + error.message);
        console.log('Пробуємо інший ресурс...');

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

            if (!response.ok) {
                throw new Error('Сервер повернув помилку: ' + response.status, { cause: error });
            }

            const user = await response.json();
            console.log('Ім\'я: ' + user.name);
            console.log('Email: ' + user.email);

        } catch (error) {
            console.log('Помилка: ' + error.message);
        }
    }
}

getUser();
