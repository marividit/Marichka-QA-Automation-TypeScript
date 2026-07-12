import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import { CustomWorld } from '../../src/support/world';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const BASE_URL = process.env.BASE_URL ?? 'https://www.saucedemo.com/';
const LOGIN = process.env.LOGIN ?? 'standard_user';
const PASSWORD = process.env.PASSWORD ?? 'secret_sauce';

Given('я на сторінці логіну SauceDemo', async function (this: CustomWorld): Promise<void> {
    await this.page.goto(BASE_URL);
});

Given('я авторизуюсь як стандартний користувач', async function (this: CustomWorld): Promise<void> {
    await this.basePage.login(LOGIN, PASSWORD);
});

Then('я маю перейти на сторінку інвентарю', async function (this: CustomWorld): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
});

Then('список товарів має бути видимим', async function (this: CustomWorld): Promise<void> {
    await expect(this.page.locator('.inventory_list')).toBeVisible();
});
