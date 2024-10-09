import { Page } from "@playwright/test"
import { AuthorizedPage } from "./authorizedPage"

export class CustomerDashboardPage extends AuthorizedPage {

  constructor(page: Page) {
    super(page)
  }
}