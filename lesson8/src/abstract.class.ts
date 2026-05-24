abstract class Geo {
    public abstract lat: string;
    public abstract lng: string;
}

abstract class Address {
    public abstract street: string;
    public abstract city: string;
    public abstract zipcode: string;
    public abstract geo: Geo;
}

abstract class Company {
    public abstract name: string;
    public abstract catchPhrase: string;
}

abstract class User {
    public abstract id: number;
    public abstract name: string;
    public abstract username: string;
    public abstract email: string;
    public abstract address: Address;
    public abstract company: Company;
}

class GeoImpl extends Geo {
    public lat: string;
    public lng: string;

    public constructor(lat: string, lng: string) {
        super();
        this.lat = lat;
        this.lng = lng;
    }
}

class AddressImpl extends Address {
    public street: string;
    public city: string;
    public zipcode: string;
    public geo: Geo;

    public constructor(street: string, city: string, zipcode: string, geo: Geo) {
        super();
        this.street = street;
        this.city = city;
        this.zipcode = zipcode;
        this.geo = geo;
    }
}

class CompanyImpl extends Company {
    public name: string;
    public catchPhrase: string;

    public constructor(name: string, catchPhrase: string) {
        super();
        this.name = name;
        this.catchPhrase = catchPhrase;
    }
}

class UserImpl extends User {
    public id: number;
    public name: string;
    public username: string;
    public email: string;
    public address: Address;
    public company: Company;

    public constructor(id: number, name: string, username: string, email: string, address: Address, company: Company) {
        super();
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.company = company;
    }
}

class UserSummary {
    public fullName: string;
    public contactInfo: string;
    public location: string;
    public companyInfo: string;
    public nameLength: number;

    public constructor(user: UserImpl) {
        this.fullName = user.name;
        this.contactInfo = `${user.username} | ${user.email}`;
        this.location = `${user.address.city}, ${user.address.zipcode}`;
        this.companyInfo = user.company.name;
        this.nameLength = user.name.length + user.username.length;
    }
}

async function getUser(): Promise<UserImpl> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();

    const geo = new GeoImpl(data.address.geo.lat, data.address.geo.lng);
    const address = new AddressImpl(data.address.street, data.address.city, data.address.zipcode, geo);
    const company = new CompanyImpl(data.company.name, data.company.catchPhrase);

    return new UserImpl(data.id, data.name, data.username, data.email, address, company);
}

function showUser(user: UserImpl): void {
    console.log('Імʼя:', user.name);
    console.log('Email:', user.email);
    console.log('Місто:', user.address.city);
    console.log('Координати:', user.address.geo.lat, user.address.geo.lng);
    console.log('Компанія:', user.company.name);
}

function convertUser(user: UserImpl): UserSummary {
    return new UserSummary(user);
}

async function main(): Promise<void> {
    const user = await getUser();
    showUser(user);

    const summary = convertUser(user);
    console.log('--- Коротка інформація ---');
    console.log('Імʼя:', summary.fullName);
    console.log('Контакт:', summary.contactInfo);
    console.log('Локація:', summary.location);
    console.log('Компанія:', summary.companyInfo);
    console.log('Сума символів імені та юзернейму:', summary.nameLength);
}

main();
