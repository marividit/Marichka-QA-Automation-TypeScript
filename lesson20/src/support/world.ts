import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { ProductCardPage } from '../pages/product-card.page';

export class CustomWorld extends World {
    public browser!: Browser;
    public context!: BrowserContext;
    public page!: Page;
    public basePage!: BasePage;
    public productCardPage!: ProductCardPage;

    public constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);
