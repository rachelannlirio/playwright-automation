import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"
import { path } from "../constants/path"

export class CartPage extends BasePage {
  readonly appCheckout: Locator
  readonly itemRow: Locator
  readonly productTitle: Locator
  readonly quantity: Locator
  readonly unitPrice: Locator
  readonly totalItemPrice: Locator
  readonly totalCartPrice: Locator
  readonly emptyCartMessage: Locator
  readonly proceedTocheckout: Locator
  readonly appCart: Locator

  constructor(page: Page) {
    super(page)
    this.path = path.cart
    this.itemRow = page.locator('tr.ng-star-inserted')
    this.productTitle = page.locator('css=.product-title')
    this.quantity = page.locator('css=input.quantity')
    this.unitPrice = page.getByRole('cell').nth(2)
    this.totalItemPrice = page.getByRole('cell').nth(3)
    this.totalCartPrice = page.locator('tfoot').locator(page.getByRole('cell').nth(3))
    this.emptyCartMessage = page.getByRole('paragraph').filter({ hasText: 'The cart is empty. Nothing to display.' })
    this.proceedTocheckout = page.getByTestId('proceed-1')
    this.appCart = page.locator('app-cart')
  }

  async getItemFromCart(productName: string): Promise<Locator> {
    await this.appCart.waitFor({ state: 'visible' })
    await this.emptyCartMessage.waitFor({ state: 'detached' })
    return this.itemRow.filter({
      hasText: productName
    })
  }

  async getItemQuantity(productName: string) {
    return (await this.getItemFromCart(productName)).locator(this.quantity)
  }

  async updateItemQuantity(productName: string, desiredQuantity: number) {
    await (await this.getItemQuantity(productName)).fill(`${desiredQuantity}`)
  }

  async getUnitPrice(productName: string) {
    return (await this.getItemFromCart(productName)).locator(this.unitPrice)
  }

  async getTotalItemPrice(productName: string) {
    return (await this.getItemFromCart(productName)).locator(this.totalItemPrice)
  }
}