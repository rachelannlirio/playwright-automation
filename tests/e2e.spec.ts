import test, { expect } from "@playwright/test"
import { HomePage } from "../pages/homePage"
import { ProductPage } from "../pages/productPage"
import { productsToPurchase } from "../test-data/productDetails"
import { CartPage } from "../pages/cartPage"
import { roundUp } from "../utils/compute"
import { userCredentials } from "../test-data/loginAccounts"
import { billingAddress } from "../test-data/billingAddress"
import { creditCard } from "../test-data/paymentMethods"

test('E2E purchase as existing customer', async ({ page }) => {
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

  await cartPage.clickProceedToCheckout(false)
  await cartPage.appLogin.login(userCredentials.customer)
  await expect(cartPage.appLogin.signInMessage)
    .toHaveText(`Hello ${userCredentials.customer.name}, you are already logged in. You can proceed to checkout.`)
  await cartPage.clickProceedToCheckout(true)

  await cartPage.appAddress.fillUpBillingAddress(billingAddress)
  await cartPage.appPayment.useCreditCard(creditCard)
  await expect(cartPage.appPayment.successMessage).toHaveText('Payment was successful')
})