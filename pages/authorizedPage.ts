import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class AuthorizedPage extends BasePage {
  readonly signOutLink: Locator
  readonly pageTitle: Locator

  constructor(page: Page) {
    super(page)
    this.signOutLink = page.getByTestId('nav-sign-out')
    this.pageTitle = page.getByTestId('page-title')
  }
}