import { ImagesApi, FavouritesApi, VotesApi, CatImage } from './api/CatApiObjects';

(async () => {
  const imagesRes = await ImagesApi.search({ limit: 1 });
  const images: CatImage[] = await imagesRes.json();
  const refImage = images[0];
  console.log('refImage', refImage);

  const favRes = await FavouritesApi.create({ image_id: refImage.id });
  const favData = await favRes.json();
  console.log('favData type', typeof favData, favData);
  const createdFavId = favData.id;
  console.log('createdFavId', createdFavId, typeof createdFavId);

  const listRes = await FavouritesApi.list();
  const favList = await listRes.json();
  console.log('favList length', favList && favList.length);
  const created = favList.find((f: any) => f.id === createdFavId);
  console.log('created found', created);
  console.log('created image', created?.image);

  const voteRes = await VotesApi.create({ image_id: refImage.id, value: 1 });
  const voteData = await voteRes.json();
  console.log('voteData', voteData);
})();
