import { expect } from 'chai';
import { ImagesApi, VotesApi, CatImage, Vote } from '../api/CatApiObjects';

describe('POST /votes — відповідь містить повний об\'єкт зображення', () => {
    it('vote response повертає об\'єкт image з усіма ключовими полями', async () => {
        const imagesRes = await ImagesApi.search({ limit: 1 });
        const images: CatImage[] = await imagesRes.json();
        const refImage = images[0];

        const voteRes  = await VotesApi.create({ image_id: refImage.id, value: 1 });
        const voteData: Vote = await voteRes.json();

        expect(voteRes.status).to.equal(201);
        expect(voteData, 'vote response має містити повний обʼєкт image, не тільки image_id').to.have.property('image');

        const { image } = voteData;
        expect(image!.id).to.equal(refImage.id,
            'image.id у vote має збігатися з тим, за яке голосували');
        expect(image).to.have.property('url').that.is.a('string').and.is.not.empty;
        expect(image).to.have.property('width').that.is.a('number');
        expect(image).to.have.property('height').that.is.a('number');
    });
});
