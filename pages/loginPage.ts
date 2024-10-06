import { Page } from "@playwright/test";
import { AppLogin } from "./components/appLogin";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  readonly appLogin: AppLogin

  constructor(page: Page) {
    super(page)
    this.appLogin = new AppLogin(page)
  }
}

