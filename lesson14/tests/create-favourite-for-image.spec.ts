import { expect } from 'chai';
import { ImagesApi, FavouritesApi, CatImage, Favourite } from '../api/CatApiObjects';

describe('POST /favourites — відповідь містить повний об\'єкт зображення', () => {
    let createdFavId: number;

    after(async () => {
        if (createdFavId) await FavouritesApi.delete(createdFavId);
    });

    it('favourite record у списку містить image з коректними полями', async () => {
        const imagesRes = await ImagesApi.search({ limit: 1 });
        const images: CatImage[] = await imagesRes.json();
        const refImage = images[0];

        const favRes  = await FavouritesApi.create({ image_id: refImage.id });
        const favData = await favRes.json();
        createdFavId  = favData.id;

        expect(favRes.status).to.equal(200);

        const listRes = await FavouritesApi.list();
        const favList: Favourite[] = await listRes.json();
        const created = favList.find((f) => f.id === createdFavId);

        expect(created).to.not.be.undefined;
        expect(created, 'favourite record має містити повний обʼєкт image').to.have.property('image');

        const { image } = created!;
        expect(image.id).to.equal(refImage.id,
            'image.id у favourite має збігатися з доданим');
        expect(image.url).to.equal(refImage.url,
            'image.url у favourite має збігатися');
        expect(image.url).to.match(/^https?:\/\//,
            'image.url має бути валідним URL');
    });
});
