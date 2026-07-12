import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import { CustomWorld } from './world';
import { BasePage } from '../pages/base.page';
import { ProductCardPage } from '../pages/product-card.page';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let browser: Browser;

BeforeAll(async function (): Promise<void> {
    browser = await chromium.launch({
        headless: process.env.HEADLESS !== 'false'
    });
});

Before(async function (this: CustomWorld): Promise<void> {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    this.basePage = new BasePage(this.page);
    this.productCardPage = new ProductCardPage(this.page);
});

After(async function (this: CustomWorld, { result }): Promise<void> {
    if (result?.status === Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot();
        this.attach(screenshot, 'image/png');
    }
    await this.context?.close();
});

AfterAll(async function (): Promise<void> {
    await browser?.close();
});
