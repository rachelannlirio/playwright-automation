import { Locator, Page } from "@playwright/test"

export class NavigationHeader {
  readonly home: Locator
  readonly categoriesSelector: Locator
  readonly contact: Locator
  readonly cart: Locator
  readonly cartQuantity: Locator
  readonly languageSelector: Locator
  readonly productAddedToast: Locator

  constructor(public page: Page) {
    this.home = page.getByTestId('nav-home')
    this.categoriesSelector = page.getByTestId('nav-categories')
    this.contact = page.getByTestId('nav-contact')
    this.cart = page.getByTestId('nav-cart')
    this.cartQuantity = page.getByTestId('cart-quantity')
    this.languageSelector = page.getByTestId('language')
    this.productAddedToast = page.locator('css=.toast-container')
  }

  async goToCart() {
    await this.cart.click()
  }
}