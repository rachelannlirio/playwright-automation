import { Locator, Page } from "@playwright/test";
import { LoginAccount } from "../test-data/loginAccounts";
import { BasePage } from "./basePage";
import { path } from "../constants/path";

export class LoginPage extends BasePage {
  readonly loginHeader: Locator
  readonly emailAddressInput: Locator
  readonly passwordInput: Locator
  readonly loginBtn: Locator
  readonly loginErrorMsg: Locator

  constructor(page: Page) {
    super(page)
    this.path = path.login
    this.loginHeader = page.getByRole('heading', { name: 'Login' })
    this.emailAddressInput = page.getByTestId('email')
    this.passwordInput = page.getByTestId('password')
    this.loginBtn = page.getByTestId('login-submit')
    this.loginErrorMsg = page.getByTestId('login-error')
  }

  async login(userLogin: LoginAccount) {
    await this.emailAddressInput.fill(userLogin.email)
    await this.passwordInput.fill(userLogin.password)
    await this.loginBtn.click()
  }
}
