import { expect } from 'chai';

const BASE_URL = process.env.CAT_API_BASE_URL as string;
const API_KEY = process.env.CAT_API_KEY as string;

describe('GET /favourites — отримання списку улюблених зображень', () => {
    it('повертає список улюблених і новий запис зʼявляється в ньому', async () => {
        const imagesResponse = await fetch(`${BASE_URL}/images/search`, {
            headers: { 'x-api-key': API_KEY }
        });
        const images = await imagesResponse.json();
        const imageId = images[0].id;

        await fetch(`${BASE_URL}/favourites`, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image_id: imageId })
        });

        const favouritesResponse = await fetch(`${BASE_URL}/favourites`, {
            headers: { 'x-api-key': API_KEY }
        });
        const favourites = await favouritesResponse.json();
        console.log(favourites);

        expect(favouritesResponse.status).to.equal(200);
        expect(favourites).to.be.an('array');

        const foundFavourite = favourites.find((fav: { image_id: string }) => fav.image_id === imageId);
        expect(foundFavourite).to.not.be.undefined;
    });
});
