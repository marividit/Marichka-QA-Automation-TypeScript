import { expect } from 'chai';

const BASE_URL = process.env.CAT_API_BASE_URL as string;
const API_KEY = process.env.CAT_API_KEY as string;

describe('POST /favourites — додавання зображення в улюблені', () => {
    it('додає отримане зображення в favourites', async () => {
        const imagesResponse = await fetch(`${BASE_URL}/images/search`, {
            headers: { 'x-api-key': API_KEY }
        });
        const images = await imagesResponse.json();
        const imageId = images[0].id;

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

        expect(favResponse.status).to.equal(200);
        expect(favData).to.have.property('id');
        expect(favData.message).to.equal('SUCCESS');
    });
});
