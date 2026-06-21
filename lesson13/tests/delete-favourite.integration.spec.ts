import { expect } from 'chai';

const BASE_URL = process.env.CAT_API_BASE_URL as string;
const API_KEY = process.env.CAT_API_KEY as string;

describe('DELETE /favourites/:id — видалення улюбленого зображення', () => {
    it('видаляє створений favourite і він зникає зі списку', async () => {
        const imagesResponse = await fetch(`${BASE_URL}/images/search`, {
            headers: { 'x-api-key': API_KEY }
        });
        const images = await imagesResponse.json();
        const imageId = images[0].id;

        const createResponse = await fetch(`${BASE_URL}/favourites`, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image_id: imageId })
        });
        const createData = await createResponse.json();
        console.log(createData);
        const favouriteId = createData.id;

        const deleteResponse = await fetch(`${BASE_URL}/favourites/${favouriteId}`, {
            method: 'DELETE',
            headers: { 'x-api-key': API_KEY }
        });
        const deleteData = await deleteResponse.json();
        console.log(deleteData);

        expect(deleteResponse.status).to.equal(200);

        const favouritesResponse = await fetch(`${BASE_URL}/favourites`, {
            headers: { 'x-api-key': API_KEY }
        });
        const favourites = await favouritesResponse.json();
        console.log(favourites);

        const foundFavourite = favourites.find((fav: { id: number }) => fav.id === favouriteId);
        expect(foundFavourite).to.be.undefined;
    });
});
