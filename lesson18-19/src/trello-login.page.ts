import { Locator, Page } from '@playwright/test';

/**
 * Page Object for Trello's login flow.
 *
 * Locators below are based on an actual recorded Playwright session
 * against https://trello.com/, not assumptions. Trello authentication
 * is delegated to Atlassian's identity service, hence the
 * `login-submit-idf-testid` naming (idf = identity flow).
 */
export class TrelloLoginPage {
    public constructor(private page: Page) {}

    // --- Entry point on trello.com -----------------------------------

    private get logInLink(): Locator {
        return this.page.getByRole('link', { name: 'Log in', exact: true });
    }

    // --- Step 1: email --------------------------------------------------

    private get emailInput(): Locator {
        return this.page.getByTestId('username');
    }

    private get rememberMeCheckbox(): Locator {
        return this.page.getByTestId('remember-me-checkbox--hidden-checkbox');
    }

    private get continueButton(): Locator {
        return this.page.getByTestId('login-submit-idf-testid');
    }

    // --- Step 2: password ---------------------------------------------

    private get passwordInput(): Locator {
        return this.page.getByTestId('password');
    }

    private get loginButton(): Locator {
        // Same testid is reused for the password step's submit button
        return this.page.getByTestId('login-submit-idf-testid');
    }

    // --- Step 3: optional 2FA -------------------------------------------
    // Atlassian app-based 2FA (authenticator). Uses role-based selectors.

    private get otpInput(): Locator {
        return this.page.getByRole('textbox', { name: /verification code/i });
    }

    private get otpSubmitButton(): Locator {
        return this.page.getByRole('button', { name: 'Log in' });
    }

    // --- Step 4: post-login MFA promotion dialog -----------------------
    // After a successful login (no 2FA on the account), Atlassian shows
    // a dialog promoting MFA setup. Confirmed via recorded session.

    private get mfaPromoteDismissButton(): Locator {
        return this.page.getByTestId('mfa-promote-dismiss-idf-testid');
    }

    // --- Error states -----------------------------------------------------

    private get errorMessage(): Locator {
        return this.page.locator('[data-testid="error-message"], [role="alert"]').filter({ visible: true });
    }

    // --- Post-login state ---------------------------------------------
    // Not captured in the recorded flow (it stopped after the password
    // submit). Best-effort only — confirm with codegen against an
    // authenticated session before relying on these in assertions.

    public get trelloHeader(): Locator {
        return this.page.locator('header#header');
    }

    public get memberAvatar(): Locator {
        return this.page.locator('[data-testid="header-member-avatar"], .member-avatar');
    }

    // --- Actions ------------------------------------------------------

    public async goto(): Promise<void> {
        await this.page.goto('https://trello.com/');
        await this.logInLink.click();
    }

    public async fillEmail(email: string, rememberMe = false): Promise<void> {
        await this.emailInput.click();
        await this.emailInput.fill(email);
        if (rememberMe) {
            await this.rememberMeCheckbox.check();
        }
        await this.continueButton.click();
    }

    public async fillPassword(password: string): Promise<void> {
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async fillOtp(token: string): Promise<void> {
        await this.otpInput.waitFor();
        await this.otpInput.fill(token);
        await this.otpSubmitButton.click();
    }

    /**
     * Dismisses the "set up MFA" promotion dialog that Atlassian shows
     * after a successful login on accounts without 2FA enabled. Safe to
     * call even if the dialog never appears (short timeout, swallows
     * the timeout error).
     */
    public async dismissMfaPromotion(): Promise<void> {
        try {
            await this.mfaPromoteDismissButton.waitFor({ timeout: 5000 });
            await this.mfaPromoteDismissButton.click();
        } catch {
            // Dialog didn't appear — nothing to dismiss, continue.
        }
    }

    public async login(
        username: string,
        password: string,
        token?: string
    ): Promise<void> {
        await this.goto();
        await this.fillEmail(username, false);
        await this.fillPassword(password);

        if (token) {
            await this.fillOtp(token);
        }

        await this.dismissMfaPromotion();
    }

    public async isLoggedIn(): Promise<boolean> {
        return await this.trelloHeader.isVisible();
    }

    public async getErrorMessage(): Promise<string | null> {
        if (await this.errorMessage.isVisible()) {
            return await this.errorMessage.textContent();
        }
        return null;
    }
}
