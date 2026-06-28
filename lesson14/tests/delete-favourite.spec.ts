import { expect } from 'chai';
import { ImagesApi, FavouritesApi, CatImage, Favourite } from '../api/CatApiObjects';

describe('DELETE /favourites/:id — улюблений запис зникає після видалення', () => {
    it('після DELETE улюблений більше не зʼявляється у списку', async () => {
        const imagesRes = await ImagesApi.search({ limit: 1 });
        const images: CatImage[] = await imagesRes.json();
        const refImage = images[0];

        const createRes  = await FavouritesApi.create({ image_id: refImage.id });
        const createData = await createRes.json();
        const favId: number = createData.id;

        const beforeList: Favourite[] = await (await FavouritesApi.list()).json();
        const beforeEntry = beforeList.find((f) => f.id === favId);

        expect(beforeEntry).to.not.be.undefined;
        expect(beforeEntry!.image.id).to.equal(refImage.id,
            'перед видаленням image.id має збігатися');

        const deleteRes = await FavouritesApi.delete(favId);
        expect(deleteRes.status).to.equal(200);

        const afterList: Favourite[] = await (await FavouritesApi.list()).json();
        const afterEntry = afterList.find((f) => f.id === favId);

        expect(afterEntry).to.be.undefined;
    });
});
