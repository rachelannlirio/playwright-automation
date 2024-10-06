import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class AuthorizedPage extends BasePage {
  readonly pageTitle: Locator
  readonly navigationMenu: Locator
  readonly signOut: Locator

  constructor(page: Page) {
    super(page)
    this.navigationMenu = page.getByTestId('nav-menu')
    this.pageTitle = page.getByTestId('page-title')
    this.signOut = page.getByTestId('nav-sign-out')
  }

  async openNavigationMenu() {
    await this.navigationMenu.click()
  }
}