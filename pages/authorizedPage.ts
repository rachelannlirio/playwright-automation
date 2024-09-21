import { Locator, Page } from "@playwright/test";

export class AuthorizedPage {
  readonly signOutLink: Locator
  readonly pageTitle: Locator

  constructor(public page: Page) {
    this.signOutLink = page.getByTestId('nav-sign-out')
    this.pageTitle = page.getByTestId('page-title')
  }
}