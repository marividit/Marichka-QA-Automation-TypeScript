import 'dotenv/config';
import { generate } from 'otplib';
import { test, expect } from '@playwright/test';
import { TrelloLoginPage } from '../src/trello-login.page';

const username = process.env.TRELLO_USER;
const password = process.env.TRELLO_PASS;
const otpSecret = process.env.TRELLO_OTP_SECRET;

if (!username || !password) {
    throw new Error('TRELLO_USER and TRELLO_PASS must be set in .env');
}
if (!otpSecret) {
    throw new Error('TRELLO_OTP_SECRET must be set in .env for app 2FA login');
}

test('login to trello.com using credentials from .env', async ({ page }) => {
    const trelloLogin = new TrelloLoginPage(page);

    const otpCode = await generate({ secret: otpSecret });
    await trelloLogin.login(username, password, otpCode);

    await expect(trelloLogin.trelloHeader).toBeVisible();
});
