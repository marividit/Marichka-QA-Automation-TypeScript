import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected shoppingCartBadge: Locator;
    protected shoppingCartLink: Locator;

    public constructor(protected readonly page: Page) {
        this.shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
    }

    public async login(username: string, password: string): Promise<void> {
        await this.page.fill('[data-test=\'username\']', username);
        await this.page.fill('[data-test=\'password\']', password);
        await this.page.click('[data-test=\'login-button\']');
        await this.page.waitForURL('**/inventory.html');
    }

    public async addProduct(titleLinkSelector: string): Promise<void> {
        const titleLink = this.page.locator(titleLinkSelector);
        await titleLink.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);

        const productContainer = titleLink.locator('xpath=ancestor::*[@data-test="inventory-item"]');
        const addToCartButton = productContainer.locator('[data-test*="add-to-cart"]');

        await addToCartButton.waitFor({ state: 'visible', timeout: 5000 });
        await addToCartButton.click();
        await this.page.waitForTimeout(500);
    }

    public async deleteProduct(productName: string): Promise<void> {
        const productIdentifier = productName.toLowerCase().replace(/\s+/g, '-');
        const deleteButton = this.page.locator(`[data-test*="remove-${productIdentifier}"]`);
        await deleteButton.waitFor({ state: 'visible', timeout: 5000 });
        await deleteButton.click();
    }

    public async getBasketItemsCount(): Promise<number> {
        const badgeVisible = await this.shoppingCartBadge.isVisible().catch(() => false);

        if (badgeVisible) {
            const badgeText = await this.shoppingCartBadge.textContent();
            return badgeText ? parseInt(badgeText, 10) : 0;
        }

        const cartItems = await this.page.locator('[data-test="cart-list"] [data-test="inventory-item"]').count();
        return cartItems;
    }

    public async verifyBasketItemsCount(expectedCount: number): Promise<void> {
        const actualCount = await this.getBasketItemsCount();
        if (actualCount !== expectedCount) {
            throw new Error(`Expected ${expectedCount} items in basket, but got ${actualCount}`);
        }
    }

    public async openBasket(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    public async checkout(firstName: string, postalCode: string): Promise<void> {
        await this.page.locator('[data-test="checkout"]').click();
        await this.page.waitForURL('**/checkout-step-one.html');

        await this.page.locator('[data-test="firstName"]').fill(firstName);

        const currentDate = new Date();
        const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}_${currentDate.getDate().toString().padStart(2, '0')}_${currentDate.getFullYear()}`;
        await this.page.locator('[data-test="lastName"]').fill(formattedDate);

        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
        await this.page.locator('[data-test="continue"]').click();
        await this.page.waitForURL('**/checkout-step-two.html');

        await this.page.locator('[data-test="finish"]').click();
        await this.page.waitForURL('**/checkout-complete.html');
    }
}
