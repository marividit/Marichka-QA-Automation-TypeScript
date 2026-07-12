import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../src/support/world';

// Мапа "назва товару" -> селектор title-link, як у вихідних .spec.ts тестах
const PRODUCT_TITLE_LINKS: Record<string, string> = {
    'Sauce Labs Fleece Jacket': '[data-test="item-5-title-link"]',
    'Sauce Labs Backpack': '[data-test="item-4-title-link"]',
    'Sauce Labs Bike Light': '[data-test="item-0-title-link"]'
};

When('я додаю товар {string} у кошик', async function (this: CustomWorld, productName: string): Promise<void> {
    const titleLink = PRODUCT_TITLE_LINKS[productName];
    if (!titleLink) {
        throw new Error(`Немає селектора для товару "${productName}". Додайте його в PRODUCT_TITLE_LINKS.`);
    }
    await this.basePage.addProduct(titleLink);
});

When('я відкриваю кошик', async function (this: CustomWorld): Promise<void> {
    await this.basePage.openBasket();
    await this.page.waitForURL('**/cart.html');
});

When('я видаляю товар {string} з кошика', async function (this: CustomWorld, productName: string): Promise<void> {
    await this.basePage.deleteProduct(productName);
});

Then('кількість товарів у кошику має дорівнювати {int}', async function (this: CustomWorld, expectedCount: number): Promise<void> {
    await this.basePage.verifyBasketItemsCount(expectedCount);
});

Then('іконка кошика має бути видимою', async function (this: CustomWorld): Promise<void> {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toBeVisible();
});
