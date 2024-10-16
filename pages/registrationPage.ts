import { expect, Locator, Page } from '@playwright/test'
import { path } from '../constants/path'
import { CustomerAccount } from '../test-data/userAccounts'
import { BasePage } from './basePage'

export class RegistrationPage extends BasePage {
  readonly registrationHeader: Locator
  readonly firstName: Locator
  readonly lastName: Locator
  readonly dateOfBirth: Locator
  readonly address: Locator
  readonly postcode: Locator
  readonly city: Locator
  readonly state: Locator
  readonly country: Locator
  readonly phone: Locator
  readonly email: Locator
  readonly password: Locator
  readonly registerBtn: Locator

  constructor(page: Page) {
    super(page)
    this.registrationHeader = page.getByRole('heading', { name: 'Customer registration' })
    this.firstName = page.getByTestId('first-name')
    this.lastName = page.getByTestId('last-name')
    this.dateOfBirth = page.getByTestId('dob')
    this.address = page.getByTestId('address')
    this.postcode = page.getByTestId('postcode')
    this.city = page.getByTestId('city')
    this.state = page.getByTestId('state')
    this.country = page.getByTestId('country')
    this.phone = page.getByTestId('phone')
    this.email = page.getByTestId('email')
    this.password = page.getByTestId('password')
    this.registerBtn = page.getByTestId('register-submit')
  }

  async register(customerAccount: CustomerAccount) {
    await this.firstName.fill(customerAccount.loginAccount.firstName)
    await this.lastName.fill(customerAccount.loginAccount.lastName)
    await this.fillUpDateOfBirth(customerAccount.personalDetails.dateOfBirth!)
    await this.address.fill(customerAccount.billingAddress.address)
    await this.postcode.fill(customerAccount.billingAddress.postcode)
    await this.city.fill(customerAccount.billingAddress.city)
    await this.state.fill(customerAccount.billingAddress.state)
    await this.country.selectOption(customerAccount.billingAddress.country)
    await this.phone.fill(customerAccount.personalDetails.phone!)
    await this.email.fill(customerAccount.loginAccount.email)
    await this.password.fill(customerAccount.loginAccount.password)

    await expect(async () => {
      await this.registerBtn.click()
      await this.page.waitForURL(`**${path.login}`)
    }).toPass({
      intervals: [1_000, 2_000, 3_000, 4_000, 5_000],
    })
  }

  async fillUpDateOfBirth(dob: Date) {
    await this.dateOfBirth.click()
    const birthMonth = (dob.getMonth() + 1).toString().padStart(2, '0')
    await this.dateOfBirth.pressSequentially(birthMonth)
    const birthDay = dob.getDay().toString().padStart(2, '0')
    await this.dateOfBirth.pressSequentially(birthDay)
    await this.dateOfBirth.pressSequentially(`${dob.getFullYear()}`)
  }
}