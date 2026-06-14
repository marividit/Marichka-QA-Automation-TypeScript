import { expect } from 'chai';

const BASE_URL = process.env.CAT_API_BASE_URL as string;
const API_KEY = process.env.CAT_API_KEY as string;

describe('GET /breeds — отримання списку порід', () => {
    it('повертає статус 200 і масив порід з обовʼязковими полями', async () => {
        const response = await fetch(`${BASE_URL}/breeds`, {
            headers: { 'x-api-key': API_KEY }
        });
        const data = await response.json();
        console.log(data);

        expect(response.status).to.equal(200);
        expect(data).to.be.an('array');
        expect(data.length).to.be.greaterThan(0);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('name');
    });
});
