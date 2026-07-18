import { test, expect } from '../src/fixtures/basket.fixture';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const BASE_URL = process.env.BASE_URL!;
const LOGIN = process.env.LOGIN!;
const PASSWORD = process.env.PASSWORD!;

const PRODUCTS = [
    { titleLink: '[data-test="item-5-title-link"]', name: 'Sauce Labs Fleece Jacket' },
    { titleLink: '[data-test="item-4-title-link"]', name: 'Sauce Labs Backpack' },
    { titleLink: '[data-test="item-0-title-link"]', name: 'Sauce Labs Bike Light' }
];

test('Add specific products to cart', async ({ page, basketPage }): Promise<void> => {
    await page.goto(`${BASE_URL}`);
    await basketPage.login(LOGIN, PASSWORD);

    for (let index = 0; index < PRODUCTS.length; index++) {
        const product = PRODUCTS[index];
        await basketPage.addProduct(product.titleLink);
        const currentCount = await basketPage.getBasketItemsCount();
        console.log(`Product ${index + 1} added. Current basket count: ${currentCount}`);
    }

    await basketPage.verifyBasketItemsCount(3);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeVisible();
});
