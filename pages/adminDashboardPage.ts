import { Locator, Page } from "@playwright/test";
import { AuthorizedPage } from "./authorizedPage";

export class AdminDashboardPage extends AuthorizedPage {
    constructor(public page: Page) {
      super(page)
    }
}