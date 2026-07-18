import { test as base } from '@playwright/test';
import { ProductCardPage } from '../pages/product-card.page';

interface ProductCardFixtures {
    productCardPage: ProductCardPage;
}

export const test = base.extend<ProductCardFixtures>({
    productCardPage: async ({ page }, use) => {
        const productCardPage = new ProductCardPage(page);
        await use(productCardPage);
    }
});

export { expect } from '@playwright/test';
