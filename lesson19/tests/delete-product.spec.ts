import { test } from '../src/fixtures/basket.fixture';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const BASE_URL = process.env.BASE_URL!;
const LOGIN = process.env.LOGIN!;
const PASSWORD = process.env.PASSWORD!;

test('Delete product from basket', async ({ page, basketPage }): Promise<void> => {
    await page.goto(`${BASE_URL}`);
    await basketPage.login(LOGIN, PASSWORD);

    await basketPage.addProduct('[data-test="item-4-title-link"]');
    let currentCount = await basketPage.getBasketItemsCount();
    console.log(`Backpack added. Current basket count: ${currentCount}`);

    await basketPage.openBasket();
    await page.waitForURL('**/cart.html');

    await basketPage.deleteProduct('Sauce Labs Backpack');
    await page.waitForTimeout(500);

    currentCount = await basketPage.getBasketItemsCount();
    console.log(`Backpack deleted. Current basket count: ${currentCount}`);

    await basketPage.verifyBasketItemsCount(0);
});
