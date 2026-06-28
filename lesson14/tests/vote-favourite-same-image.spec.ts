import { expect } from 'chai';
import { ImagesApi, VotesApi, FavouritesApi, CatImage, Vote, Favourite } from '../api/CatApiObjects';

describe('images → votes + favourites — одне зображення в обох модулях', () => {
    let favId: number;

    after(async () => {
        if (favId) await FavouritesApi.delete(favId);
    });

    it('vote і favourite повертають однаковий обʼєкт image для одного зображення', async () => {
        const imagesRes = await ImagesApi.search({ limit: 1 });
        const images: CatImage[] = await imagesRes.json();
        const refImage = images[0];

        const voteRes  = await VotesApi.create({ image_id: refImage.id, value: 1 });
        const voteData: Vote = await voteRes.json();

        expect(voteRes.status).to.equal(201);
        expect(voteData).to.have.property('image');
        expect(voteData.image!.id).to.equal(refImage.id,  'vote → image.id');
        expect(voteData.image!.url).to.equal(refImage.url, 'vote → image.url');

        const favRes  = await FavouritesApi.create({ image_id: refImage.id });
        const favData = await favRes.json();
        favId         = favData.id;

        expect(favRes.status).to.equal(200);

        const favList: Favourite[] = await (await FavouritesApi.list()).json();
        const favEntry = favList.find((f) => f.id === favId);

        expect(favEntry).to.not.be.undefined;
        expect(favEntry!.image.id).to.equal(refImage.id,  'favourite → image.id');
        expect(favEntry!.image.url).to.equal(refImage.url, 'favourite → image.url');

        expect(voteData.image!.id).to.equal(favEntry!.image.id,
            'vote і favourite мають посилатися на одне і те ж зображення');
    });
});
