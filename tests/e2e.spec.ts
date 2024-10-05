import test, { expect } from "@playwright/test"
import { HomePage } from "../pages/homePage"
import { ProductPage } from "../pages/productPage"
import { productsToPurchase } from "../test-data/productDetails"
import { CartPage } from "../pages/cartPage"
import { roundUp } from "../utils/compute"

test('E2E add to cart and checkout', async ({ page }) => {
  const homePage = new HomePage(page)
  const productPage = new ProductPage(page)
  const cartPage = new CartPage(page)
  await homePage.open()

  for (const [index, productToPurchase] of productsToPurchase.entries()) {
    await homePage.clickProduct(productToPurchase.productDetails.productName)
    await productPage.updateQuantityByInput(productToPurchase.desiredQuantity)
    await productPage.clickAddToCart()
    await expect(productPage.productAddedToast).toHaveText('Product added to shopping cart.')

    if (index === productsToPurchase.length - 1) {
      await productPage.navigationHeader.goToCart()
    } else {
      await cartPage.navigationHeader.goToHome()
    }
  }

  let totalCartPrice = 0
  for (const productToPurchase of productsToPurchase) {
    const product = productToPurchase.productDetails
    const totalItemPrice = roundUp(product.unitPrice * productToPurchase.desiredQuantity)
    totalCartPrice += totalItemPrice
    expect(await cartPage.getItemQuantity(product.productName)).toHaveValue(`${productToPurchase.desiredQuantity}`)
    expect(await cartPage.getUnitPrice(product.productName)).toHaveText(`$${product.unitPrice}`)
    expect(await cartPage.getTotalItemPrice(product.productName)).toHaveText(`$${totalItemPrice.toFixed(2)}`)
  }
  expect(cartPage.totalCartPrice).toHaveText(`$${totalCartPrice.toFixed(2)}`)
})