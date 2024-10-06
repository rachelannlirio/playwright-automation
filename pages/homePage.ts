import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class HomePage extends BasePage {
  readonly path: string = '/'
  readonly signInLink: Locator
  readonly products: Locator

  constructor(page: Page) {
    super(page)
    this.signInLink = page.getByTestId('nav-sign-in')
    this.products = page.getByTestId(/^product-[A-Z0-9]+$/)
  }

  async clickSignIn() {
    await this.signInLink.click()
  }

  async clickProduct(itemName: string) {
    await this.products.filter({ hasText: itemName }).click()
  }
}