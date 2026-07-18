import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductCardPage extends BasePage {
    public constructor(page: Page) {
        super(page);
    }

    public async clickFirstInventoryItem(): Promise<void> {
        await this.page.locator('[data-test="inventory-item-description"]').first().click();
    }

    public async clickProductByName(productName: string): Promise<void> {
        await this.page.getByText(productName).click();
    }

    public async clickProductTitleLink(itemId: number): Promise<void> {
        await this.page.locator(`[data-test="item-${itemId}-title-link"]`).click();
    }
}
