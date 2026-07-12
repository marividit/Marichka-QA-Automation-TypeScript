import { test as base } from '@playwright/test';
import { BasePage } from '../pages/base.page';

interface BasketFixtures {
    basketPage: BasePage;
}

export const test = base.extend<BasketFixtures>({
    basketPage: async ({ page }, use) => {
        const basketPage = new BasePage(page);
        await use(basketPage);
    }
});

export { expect } from '@playwright/test';
