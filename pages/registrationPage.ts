import { Locator, Page } from "@playwright/test";
import { path } from "../constants/path";
import { RegistrationDetails } from "../test-data/registrationDetails";
import { BasePage } from "./basePage";

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

  async register(registrationDetails: RegistrationDetails) {
    await this.firstName.fill(registrationDetails.firstName)
    await this.lastName.fill(registrationDetails.lastName)
    await this.fillUpDateOfBirth(registrationDetails.dateOfBirth)
    await this.address.fill(registrationDetails.address)
    await this.postcode.fill(registrationDetails.postcode)
    await this.city.fill(registrationDetails.city)
    await this.state.fill(registrationDetails.state)
    await this.country.selectOption({ label: registrationDetails.country })
    await this.phone.fill(registrationDetails.phone)
    await this.email.fill(registrationDetails.email)
    await this.password.fill(registrationDetails.password)
    await this.registerBtn.click()
    await this.page.waitForURL(`**${path.login}`)
  }

  async fillUpDateOfBirth(dob: Date) {
    await this.dateOfBirth.click()
    await this.dateOfBirth.pressSequentially(`${dob.getFullYear()}`)
    await this.dateOfBirth.press('Tab')
    const birthMonth = (dob.getMonth() + 1).toString().padStart(2, '0')
    await this.dateOfBirth.pressSequentially(birthMonth)
    const birthDay = dob.getDay().toString().padStart(2, '0')
    await this.dateOfBirth.pressSequentially(birthDay)
  }
}