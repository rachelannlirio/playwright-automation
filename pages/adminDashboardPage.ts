import { Locator, Page } from "@playwright/test";

export class AdminDashboardPage {
    readonly signOutLink: Locator

    constructor(public page: Page) {
      this.signOutLink = page.getByTestId('nav-sign-out')
    }
}