import { Locator, Page } from "@playwright/test"
import { BillingAddress } from "../../test-data/billingAddress"

export class AppAddress {
  readonly appAddressElem: Locator
  readonly billingAddressHeader: Locator
  readonly address: Locator
  readonly city: Locator
  readonly state: Locator
  readonly country: Locator
  readonly postcode: Locator
  readonly billingAddressCheckout: Locator

  constructor(page: Page) {
    this.appAddressElem = page.locator('app-address')
    this.billingAddressHeader = this.appAddressElem.getByRole('heading', { name: 'Billing Address' })
    this.address = this.appAddressElem.getByTestId('address')
    this.city = this.appAddressElem.getByTestId('city')
    this.state = this.appAddressElem.getByTestId('state')
    this.country = this.appAddressElem.getByTestId('country')
    this.postcode = this.appAddressElem.getByTestId('postcode')
    this.billingAddressCheckout = page.getByTestId('proceed-3')
  }

  async fillUpBillingAddress(billingAddress: BillingAddress) {
    await this.address.fill(billingAddress.address)
    await this.city.fill(billingAddress.city)
    await this.state.fill(billingAddress.state)
    await this.country.fill(billingAddress.country)
    await this.postcode.fill(billingAddress.postcode)
    await this.billingAddressCheckout.click()
    await this.appAddressElem.waitFor({ state: 'hidden' })
  }
}