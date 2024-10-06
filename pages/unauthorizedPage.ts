import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class UnauthorizedPage extends BasePage {
  readonly signIn: Locator

  constructor(page: Page) {
    super(page)
    this.signIn = page.getByTestId('nav-sign-in')
  }
}