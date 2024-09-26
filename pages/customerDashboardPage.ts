import { Locator, Page } from "@playwright/test";
import { AuthorizedPage } from "./authorizedPage";

export class CustomerAccountPage extends AuthorizedPage {
  readonly pageTitleHeader: Locator

  constructor(page: Page) {
    super(page)
    this.pageTitleHeader = page.getByTestId('page-title')
  }
}