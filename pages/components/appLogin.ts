import { Locator, Page } from "@playwright/test"
import { LoginAccount } from "../../test-data/loginAccounts"

export class AppLogin {
  readonly appLoginElem: Locator

  readonly loginHeader: Locator
  readonly emailAddressInput: Locator
  readonly passwordInput: Locator
  readonly loginBtn: Locator
  readonly loginErrorMsg: Locator

  readonly signInMessage: Locator
  readonly proceedToCheckout: Locator

  readonly registerLink: Locator

  constructor(page: Page) {
    this.appLoginElem = page.locator('app-login')

    this.loginHeader = page.getByRole('heading', { name: 'Login' })
    this.emailAddressInput = page.getByTestId('email')
    this.passwordInput = page.getByTestId('password')
    this.loginBtn = page.getByTestId('login-submit')
    this.loginErrorMsg = page.getByTestId('login-error')

    this.signInMessage = this.appLoginElem.getByRole('paragraph')
    this.proceedToCheckout = page.getByTestId('proceed-2')

    this.registerLink = page.getByTestId('register-link')
  }

  async login(userLogin: LoginAccount) {
    await this.emailAddressInput.fill(userLogin.email);
    await this.passwordInput.fill(userLogin.password);
    await this.loginBtn.click();
  }

  async clickRegisterYourAccount() {
    await this.registerLink.click()
  }
}
