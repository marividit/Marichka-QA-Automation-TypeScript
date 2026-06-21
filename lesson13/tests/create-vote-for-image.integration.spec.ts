import { expect } from 'chai';

const BASE_URL = process.env.CAT_API_BASE_URL as string;
const API_KEY = process.env.CAT_API_KEY as string;

describe('POST /votes — голосування за зображення', () => {
    it('створює голос для отриманого зображення', async () => {
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

        expect(voteResponse.status).to.equal(201);
        expect(voteData.image_id).to.equal(imageId);
        expect(voteData.value).to.equal(1);
    });
});
