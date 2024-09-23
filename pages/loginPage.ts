import { Locator, Page } from "@playwright/test";
import { LoginAccount } from "../test-data/loginAccounts";

export class LoginPage {
  readonly path: string = '/auth/login'
  readonly loginHeader: Locator
  readonly emailAddressInput: Locator
  readonly passwordInput: Locator
  readonly loginBtn: Locator

  constructor(public page: Page) {
    this.loginHeader = page.getByRole('heading', { name: 'Login' })
    this.emailAddressInput = page.getByTestId('email')
    this.passwordInput = page.getByTestId('password')
    this.loginBtn = page.getByTestId('login-submit')
  }

  async open() {
    await this.page.goto(this.path)
  }

  async login(userLogin: LoginAccount) {
    await this.emailAddressInput.fill(userLogin.email)
    await this.passwordInput.fill(userLogin.password)
    await this.loginBtn.click()
  }
}