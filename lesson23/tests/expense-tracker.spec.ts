import { expect, test } from '@playwright/test';

test.describe('Expense Tracker App', () => {
    test('shows the main page sections', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByRole('heading', { name: 'Expense Tracker App', exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Current Balance', exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Income', exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Expense', exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Transaction History', exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Add New Transaction', exact: true })).toBeVisible();
        await expect(page.locator('#balance')).toHaveText('$0.00');
    });

    test('adds an income transaction', async ({ page }) => {
        await page.goto('/');

        await page.getByLabel('Description').fill('Salary');
        await page.getByLabel('Transaction Amount').fill('1500');
        await page.getByRole('button', { name: 'Add Transaction' }).click();

        await expect(page.locator('#balance')).toHaveText('$1500.00');
        await expect(page.getByText('Salary')).toBeVisible();
        await expect(page.getByText('+$1500')).toBeVisible();
    });

    test('adds an expense transaction', async ({ page }) => {
        await page.goto('/');

        await page.getByLabel('Description').fill('Groceries');
        await page.getByLabel('Transaction Amount').fill('-80');
        await page.getByRole('button', { name: 'Add Transaction' }).click();

        await expect(page.locator('#balance')).toHaveText('$-80.00');
        await expect(page.getByText('Groceries')).toBeVisible();
        await expect(page.getByText('-$80')).toBeVisible();
    });
});
