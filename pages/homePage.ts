import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  readonly path: string = '/'
  readonly signInLink: Locator

  constructor(page: Page) {
    super(page)
    this.signInLink = page.getByTestId('nav-sign-in')
  }

  async clickSignIn() {
    await this.signInLink.click()
  }

}