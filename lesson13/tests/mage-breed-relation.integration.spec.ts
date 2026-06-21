import { expect } from 'chai';

const BASE_URL = process.env.CAT_API_BASE_URL as string;
const API_KEY = process.env.CAT_API_KEY as string;

describe('Звʼязок breeds → images — перевірка відповідності породи зображенню', () => {
    it('зображення повертає правильний breed_id для запитаної породи', async () => {
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

        expect(images[0]).to.have.property('breeds');
        expect(images[0].breeds[0].id).to.equal(breedId);
    });
});
