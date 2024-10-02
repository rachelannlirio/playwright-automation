import { Page } from "@playwright/test"
import { AuthorizedPage } from "./authorizedPage"

export class CustomerAccountPage extends AuthorizedPage {

  constructor(page: Page) {
    super(page)
  }
}