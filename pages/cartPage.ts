import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class CartPage extends BasePage {
  readonly appCheckout: Locator
  readonly itemRow: Locator
  readonly productTitle: Locator
  quantity: Locator
  readonly proceedTocheckout: Locator

  constructor(page: Page) {
    super(page)
    this.itemRow = page.locator('tr.ng-star-inserted')
    this.productTitle = page.locator('css=.product-title')
    this.quantity = page.locator('css=.quantity')
    this.proceedTocheckout = page.getByTestId('proceed-1')
  }

  async getItemFromCart(productName: string): Promise<Locator> {
    return this.itemRow.filter({ hasText: productName })
  }

  async getItemQuantity(productName: string) {
    return (await this.getItemFromCart(productName)).getByLabel(`Quantity for ${productName}`)
  }

  async updateItemQuantity(productName: string, desiredQuantity: number) {
    (await this.getItemQuantity(productName)).fill(`${desiredQuantity}`)
  }

  async getUnitPrice(productName: string) {
    return (await this.getItemFromCart(productName)).getByRole('cell').nth(2)
  }

  async getTotalItemPrice(productName: string) {
    return (await this.getItemFromCart(productName)).getByRole('cell').nth(3)
  }
}