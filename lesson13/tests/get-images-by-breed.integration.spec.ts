import { expect } from 'chai';

const BASE_URL = process.env.CAT_API_BASE_URL as string;
const API_KEY = process.env.CAT_API_KEY as string;

describe('GET /images/search?breed_ids — отримання зображень конкретної породи', () => {
    it('повертає зображення для першої породи зі списку', async () => {
        const breedsResponse = await fetch(`${BASE_URL}/breeds`, {
            headers: { 'x-api-key': API_KEY }
        });
        const breeds = await breedsResponse.json();
        const breedId = breeds[0].id;

        const imagesResponse = await fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&limit=1`, {
            headers: { 'x-api-key': API_KEY }
        });
        const images = await imagesResponse.json();
        console.log(images);

        expect(imagesResponse.status).to.equal(200);
        expect(images).to.be.an('array');
        expect(images.length).to.be.greaterThan(0);
        expect(images[0]).to.have.property('url');
    });
});
