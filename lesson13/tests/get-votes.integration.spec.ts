import { expect } from 'chai';

const BASE_URL = process.env.CAT_API_BASE_URL as string;
const API_KEY = process.env.CAT_API_KEY as string;

describe('GET /votes — отримання списку голосів', () => {
    it('повертає список голосів і новий голос зʼявляється в ньому', async () => {
        const imagesResponse = await fetch(`${BASE_URL}/images/search`, {
            headers: { 'x-api-key': API_KEY }
        });
        const images = await imagesResponse.json();
        const imageId = images[0].id;

        await fetch(`${BASE_URL}/votes`, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image_id: imageId, value: 1 })
        });

        const votesResponse = await fetch(`${BASE_URL}/votes`, {
            headers: { 'x-api-key': API_KEY }
        });
        const votes = await votesResponse.json();
        console.log(votes);

        expect(votesResponse.status).to.equal(200);
        expect(votes).to.be.an('array');

        const foundVote = votes.find((vote: { image_id: string }) => vote.image_id === imageId);
        expect(foundVote).to.not.be.undefined;
    });
});
