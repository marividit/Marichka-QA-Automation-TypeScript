import { expect } from 'chai';

const BASE_URL = process.env.CAT_API_BASE_URL as string;
const API_KEY = process.env.CAT_API_KEY as string;

describe('GET /images/search — отримання випадкового зображення', () => {
    it('повертає статус 200 і обʼєкт з полем url', async () => {
        const response = await fetch(`${BASE_URL}/images/search`, {
            headers: { 'x-api-key': API_KEY }
        });
        const data = await response.json();
        console.log(data);

        expect(response.status).to.equal(200);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('url');
    });
});
