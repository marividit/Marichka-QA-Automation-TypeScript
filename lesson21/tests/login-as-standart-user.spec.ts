import { test, expect } from '../src/fixtures/basket.fixture';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const BASE_URL = process.env.BASE_URL!;
const LOGIN = process.env.LOGIN!;
const PASSWORD = process.env.PASSWORD!;

test('Login as standard user', async ({ page, basketPage }): Promise<void> => {
    await page.goto(`${BASE_URL}`);
    await basketPage.login(LOGIN, PASSWORD);
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
});
