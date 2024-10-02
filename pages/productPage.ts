import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class ProductPage extends BasePage {
  readonly productName: Locator
  readonly relatedProductsHeader: Locator
  readonly addToCartBtn: Locator
  readonly category: Locator
  readonly brand: Locator
  readonly unitPrice: Locator
  readonly quantityInput: Locator
  readonly increaseQuantity: Locator
  readonly decreaseQuantity: Locator

  constructor(page: Page) {
    super(page)
    this.productName = page.getByTestId('product-name')
    this.addToCartBtn = page.getByTestId('add-to-cart')
    this.category = page.getByLabel('category')
    this.brand = page.getByLabel('brand')
    this.unitPrice = page.getByTestId('unit-price')
    this.quantityInput = page.getByTestId('quantity')
    this.increaseQuantity = page.getByTestId('increase-quantity')
    this.decreaseQuantity = page.getByTestId('decrease-quantity')
    this.relatedProductsHeader = page.getByRole('heading', { name: 'Related Products' })
  }

  async updateQuantityByInput(quantity: number) {
    await this.quantityInput.fill(quantity.toString())
  }

  async clickAddToCart() {
    await this.addToCartBtn.click()
  }
}