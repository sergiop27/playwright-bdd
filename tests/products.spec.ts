import { test, expect } from '@playwright/test';

test.describe('Inventory - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('visualizar productos del inventario', async ({ page }) => {

    await expect(page.locator('[data-test="title"]'))
      .toHaveText('Products');

    const products = page.locator('[data-test="inventory-item"]');

    await expect(products).toHaveCount(6);
  });

  test('navegar al detalle de un producto', async ({ page }) => {

    await page.getByText('Sauce Labs Backpack').click();

    await expect(page)
      .toHaveURL(/inventory-item.html/);

    await expect(
      page.locator('[data-test="inventory-item-name"]')
    ).toHaveText('Sauce Labs Backpack');

    await expect(
      page.locator('[data-test="inventory-item-price"]')
    ).toHaveText('$29.99');
  });
});