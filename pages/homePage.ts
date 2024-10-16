import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class HomePage extends BasePage {
  readonly path: string = '/'
  readonly products: Locator

  constructor(page: Page) {
    super(page)
    this.products = page.getByTestId(/^product-[A-Z0-9]+$/)
  }

  async clickProduct(itemName: string) {
    await this.products.filter({ hasText: itemName }).click()
  }
}