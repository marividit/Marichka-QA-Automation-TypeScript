import { test, expect } from '../src/fixtures/basket.fixture';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const BASE_URL = process.env.BASE_URL!;
const LOGIN = process.env.LOGIN!;
const PASSWORD = process.env.PASSWORD!;

test('Checkout with dynamic date in last name', async ({ page, basketPage }): Promise<void> => {
    await page.goto(`${BASE_URL}`);
    await basketPage.login(LOGIN, PASSWORD);

    await basketPage.addProduct('[data-test="item-4-title-link"]');
    const cartCount = await basketPage.getBasketItemsCount();
    console.log(`Product added. Current basket count: ${cartCount}`);

    await basketPage.openBasket();
    await page.waitForURL('**/cart.html');

    const currentDate = new Date();
    const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}_${currentDate.getDate().toString().padStart(2, '0')}_${currentDate.getFullYear()}`;
    console.log(`Checkout with last name containing date: ${formattedDate}`);

    await basketPage.checkout('automation', '12345');

    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    console.log(`Checkout completed with last name containing date: ${formattedDate}`);
});
