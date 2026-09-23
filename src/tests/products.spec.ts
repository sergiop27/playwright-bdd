import { ProductsPage } from '../pages/productsPage';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Products - SauceDemo', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await loginPage.goToLogin();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('visualizar productos del inventario', async () => {
    await expect(productsPage.getTitle()).toHaveText('Products');
    await expect(productsPage.getInventoryItems()).toHaveCount(6);
  });

  test('navegar al detalle de un producto', async ({ page }) => {
    await productsPage.openProduct('Sauce Labs Backpack');

    await expect(page).toHaveURL(/inventory-item.html/);
    await expect(productsPage.getProductDetailName()).toHaveText('Sauce Labs Backpack');
    await expect(productsPage.getProductDetailPrice()).toHaveText('$29.99');
  });
});