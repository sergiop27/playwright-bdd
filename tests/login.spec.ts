import { test, expect } from '@playwright/test';

test.describe('Login - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('login exitoso con usuario válido', async ({ page }) => {

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('login fallido con contraseña incorrecta', async ({ page }) => {

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('password_incorrecta');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username and password do not match');
  });

  test('login fallido con usuario bloqueado', async ({ page }) => {

    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Sorry, this user has been locked out');
  });

});