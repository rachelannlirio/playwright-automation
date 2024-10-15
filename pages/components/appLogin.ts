import { expect, Locator, Page } from "@playwright/test"
import { LoginAccount } from "../../test-data/userAccounts"
import { BasePage } from "../basePage"

export class AppLogin extends BasePage {
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
    super(page)
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

  async login(userLogin: LoginAccount, successfulLogin: boolean = true) {
    await this.emailAddressInput.fill(userLogin.email)
    await this.passwordInput.fill(userLogin.password)

    await expect(async () => {
      await this.loginBtn.click()
      successfulLogin
        ? await expect(this.navigationHeader.signIn).toBeHidden()
        : await expect(this.loginErrorMsg).toBeVisible()
    }).toPass({
      intervals: [1_000, 2_000, 3_000, 4_000, 5_000],
    })
  }

  async clickRegisterYourAccount() {
    await this.registerLink.click()
  }

  async clickProceedToCheckout() {
    this.proceedToCheckout.click()
  }
}
