import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../src/support/world';

When(
    'я оформлюю замовлення з іменем {string} та поштовим індексом {string}',
    async function (this: CustomWorld, firstName: string, postalCode: string): Promise<void> {
        await this.basePage.checkout(firstName, postalCode);
    }
);

Then('сторінка завершення замовлення має відображатись', async function (this: CustomWorld): Promise<void> {
    await expect(this.page.locator('[data-test="complete-header"]')).toBeVisible();
});
