import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });

  await page.goto('/');
});

test('solo flow increments moves after resolving a mismatch', async ({ page }) => {
  await page.getByRole('button', { name: 'Numbers' }).click();
  await page.getByRole('button', { name: 'Start Game' }).click();

  await page.getByRole('button', { name: /^Card 1$/ }).click();
  await page.getByRole('button', { name: /^Card 2$/ }).click();

  await expect(page.locator('.result-moves .result')).toHaveText('1');
});

test('multiplayer flow rotates the current player after a mismatch', async ({ page }) => {
  await page.getByRole('button', { name: 'Numbers' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: 'Start Game' }).click();

  await page.getByRole('button', { name: /^Card 1$/ }).click();
  await page.getByRole('button', { name: /^Card 2$/ }).click();

  await expect(page.locator('.player[data-active="true"] .pl-title')).toHaveText('Player 2');
});