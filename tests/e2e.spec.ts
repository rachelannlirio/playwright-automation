import test, { expect } from "@playwright/test"
import { CartPage } from "../pages/cartPage"
import { CustomerDashboardPage } from "../pages/customerDashboardPage"
import { HomePage } from "../pages/homePage"
import { LoginPage } from "../pages/loginPage"
import { ProductPage } from "../pages/productPage"
import { RegistrationPage } from "../pages/registrationPage"
import { generateRandomBillingAddress } from "../test-data/billingAddress"
import { creditCardDetails } from "../test-data/paymentMethods"
import { productsToPurchase } from "../test-data/productDetails"
import { generateRandomCustomerAccount, userAccounts } from "../test-data/userAccounts"
import { roundUp } from "../utils/compute"

let homePage: HomePage
let productPage: ProductPage
let cartPage: CartPage

test.describe('E2E test: add products to cart and checkout', async () => {
  test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(35000)
    homePage = new HomePage(page)
    productPage = new ProductPage(page)
    cartPage = new CartPage(page)
    await homePage.open()
  })

  test('E2E purchase as an existing customer', async () => {
    await addProductsToCart()
    await verifyCartContents()

    await cartPage.clickProceedToCheckout()
    const customerAccount = userAccounts.customer
    await cartPage.appLogin.login(customerAccount.loginAccount)
    const customerName = `${customerAccount.loginAccount.firstName} ${customerAccount.loginAccount.lastName}`
    await expect(cartPage.appLogin.signInMessage)
      .toHaveText(`Hello ${customerName}, you are already logged in. You can proceed to checkout.`)
    await cartPage.appLogin.clickProceedToCheckout()

    const billingAddress = customerAccount.billingAddress
    await expect(cartPage.appAddress.address).toHaveValue(billingAddress.address)
    await expect(cartPage.appAddress.city).toHaveValue(billingAddress.city)
    await expect(cartPage.appAddress.state).toHaveValue(billingAddress.state)
    await expect(cartPage.appAddress.country).toHaveValue(billingAddress.country)
    await expect(cartPage.appAddress.postcode).toHaveValue(billingAddress.postcode)

    await cartPage.appAddress.fillUpBillingAddress(generateRandomBillingAddress())
    await cartPage.appPayment.useCreditCard(creditCardDetails)
    await expect(cartPage.appPayment.successMessage).toHaveText('Payment was successful')
  })

  test('E2E purchase as a new customer', async ({ page }) => {
    const registrationPage = new RegistrationPage(page)
    const loginPage = new LoginPage(page)
    const customerDashboardPage = new CustomerDashboardPage(page)
    await addProductsToCart()
    await verifyCartContents()

    await cartPage.clickProceedToCheckout()
    await cartPage.appLogin.clickRegisterYourAccount()
    const customerAccount = generateRandomCustomerAccount()
    await registrationPage.register(customerAccount)

    await loginPage.appLogin.login(customerAccount.loginAccount)
    await expect(customerDashboardPage.pageTitle).toHaveText('My account')
    await customerDashboardPage.navigationHeader.goToCart()
    await cartPage.clickProceedToCheckout()
    const customerName = `${customerAccount.loginAccount.firstName} ${customerAccount.loginAccount.lastName}`
    await expect(cartPage.appLogin.signInMessage)
      .toHaveText(`Hello ${customerName}, you are already logged in. You can proceed to checkout.`)
    await cartPage.appLogin.clickProceedToCheckout()

    const billingAddress = customerAccount.billingAddress
    await expect(cartPage.appAddress.address).toHaveValue(billingAddress.address)
    await expect(cartPage.appAddress.city).toHaveValue(billingAddress.city)
    await expect(cartPage.appAddress.state).toHaveValue(billingAddress.state)
    await expect(cartPage.appAddress.country).toHaveValue(billingAddress.country)
    await expect(cartPage.appAddress.postcode).toHaveValue(billingAddress.postcode)
    await cartPage.appAddress.clickProceedToCheckout()
    await cartPage.appPayment.useCreditCard(creditCardDetails)
    await expect(cartPage.appPayment.successMessage).toHaveText('Payment was successful')
  })
})

async function addProductsToCart() {
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
}

async function verifyCartContents() {
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
}
