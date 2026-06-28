/// <reference types="mocha" />
import { expect } from 'chai';
import { BreedsApi, ImagesApi, CatBreed, CatImage } from '../api/CatApiObjects';

describe('GET /images/search?breed_ids — breed→image integration', () => {
    it('зображення повертає повний об\'єкт породи, а не лише її ID', async () => {
        const breedsRes = await BreedsApi.list();
        const breeds: CatBreed[] = await breedsRes.json();
        const refBreed = breeds[0];

        const imagesRes = await ImagesApi.search({ breed_ids: refBreed.id, limit: 1 });
        const images: CatImage[] = await imagesRes.json();

        expect(imagesRes.status).to.equal(200);
        expect(images).to.be.an('array').with.length.greaterThan(0);

        const image = images[0];
        expect(image).to.have.property('breeds').that.is.an('array').with.length.greaterThan(0);

        const imageBreed = image.breeds![0];

        expect(imageBreed.id).to.equal(refBreed.id,
            'breed ID у зображенні має збігатися з еталонним');
        expect(imageBreed.name).to.equal(refBreed.name,
            'breed name має бути підтягнутий');
        expect(imageBreed.origin).to.equal(refBreed.origin,
            'breed origin має бути підтягнутий');
        expect(imageBreed.temperament).to.equal(refBreed.temperament,
            'breed temperament має бути підтягнутий');
        expect(imageBreed.description).to.equal(refBreed.description,
            'breed description має бути підтягнутий');
        expect(imageBreed.life_span).to.equal(refBreed.life_span,
            'breed life_span має бути підтягнутий');
    });
});
