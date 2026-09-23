import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductsPage extends BasePage {
  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly productDetailName: Locator;
  private readonly productDetailPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.productDetailName = page.locator('[data-test="inventory-item-name"]');
    this.productDetailPrice = page.locator('[data-test="inventory-item-price"]');
  }

  getTitle(): Locator {
    return this.title;
  }

  getInventoryItems(): Locator {
    return this.inventoryItems;
  }

  async openProduct(productName: string): Promise<void> {
    await this.click(this.page.getByText(productName, { exact: true })
    );
  }

  getProductDetailName(): Locator {
    return this.productDetailName;
  }

  getProductDetailPrice(): Locator {
    return this.productDetailPrice;
  }
}