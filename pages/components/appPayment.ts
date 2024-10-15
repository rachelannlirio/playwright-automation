import { Locator, Page } from '@playwright/test'
import { CreditCardDetails } from '../../test-data/paymentMethods'

export class AppPayment {
  readonly appPaymentElem: Locator
  readonly paymentMethod: Locator
  readonly creditCardNumber: Locator
  readonly expirationDate: Locator
  readonly cvv: Locator
  readonly cardHolderName: Locator
  readonly confirmBtn: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.appPaymentElem = page.getByRole('heading', { name: 'Payment' })
    this.paymentMethod = page.getByTestId('payment-method')
    this.creditCardNumber = page.getByTestId('credit_card_number')
    this.expirationDate = page.getByTestId('expiration_date')
    this.cvv = page.getByTestId('cvv')
    this.cardHolderName = page.getByTestId('card_holder_name')
    this.confirmBtn = page.getByTestId('finish')
    this.successMessage = page.locator('css=div.alert-success')
  }

  async useCreditCard(creditCard: CreditCardDetails) {
    await this.paymentMethod.selectOption('credit-card')
    await this.creditCardNumber.fill(creditCard.cardNumber)
    await this.expirationDate.fill(creditCard.expirationDate)
    await this.cvv.fill(`${creditCard.cvv}`)
    await this.cardHolderName.fill(creditCard.cardHolderName)
    await this.confirmBtn.isEnabled()
    await this.confirmBtn.click()
  }
}