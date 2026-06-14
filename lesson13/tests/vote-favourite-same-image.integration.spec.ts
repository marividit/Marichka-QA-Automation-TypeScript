import { expect } from 'chai';

const BASE_URL = process.env.CAT_API_BASE_URL as string;
const API_KEY = process.env.CAT_API_KEY as string;

describe('Звʼязок images → votes + favourites — одне зображення в обох модулях', () => {
    it('одне і те саме зображення можна проголосувати і додати в улюблені', async () => {
        const imagesResponse = await fetch(`${BASE_URL}/images/search`, {
            headers: { 'x-api-key': API_KEY }
        });
        const images = await imagesResponse.json();
        const imageId = images[0].id;

        const voteResponse = await fetch(`${BASE_URL}/votes`, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image_id: imageId, value: 1 })
        });
        const voteData = await voteResponse.json();
        console.log(voteData);

        const favResponse = await fetch(`${BASE_URL}/favourites`, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image_id: imageId })
        });
        const favData = await favResponse.json();
        console.log(favData);

        expect(voteResponse.status).to.equal(201);
        expect(favResponse.status).to.equal(200);
    });
});
