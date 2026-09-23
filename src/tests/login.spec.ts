import { ProductsPage } from '../pages/productsPage';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login - SauceDemo', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await loginPage.goToLogin();
  });

  test('login exitoso con usuario válido', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(productsPage.getTitle()).toHaveText('Products');
  });

  test('login fallido con contraseña incorrecta', async () => {
    await loginPage.login('standard_user', 'password_incorrecta');

    await expect(loginPage.getErrorMessage()).toContainText('Username and password do not match');
  });

  test('login fallido con usuario bloqueado', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.getErrorMessage()).toContainText('Sorry, this user has been locked out');
  });
});