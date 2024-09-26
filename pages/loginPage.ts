import { Locator, Page } from "@playwright/test";
import { LoginAccount } from "../test-data/loginAccounts";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  readonly path: string = '/auth/login'
  readonly loginHeader: Locator
  readonly emailAddressInput: Locator
  readonly passwordInput: Locator
  readonly loginBtn: Locator
  readonly loginErrorMsg: Locator

  constructor(page: Page) {
    super(page)
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
