import { Locator, Page } from "@playwright/test";
import { AuthorizedPage } from "./authorizedPage";

export class CustomerDashboardPage extends AuthorizedPage {
  readonly pageTitleHeader: Locator

  constructor(public page: Page) {
    super(page)
    this.pageTitleHeader = page.getByTestId('page-title')
  }
}