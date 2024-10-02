import test, { expect } from "@playwright/test"
import { HomePage } from "../pages/homePage"
import { ProductPage } from "../pages/productPage"
import { ProductDetails } from "../test-data/productDetails"
import { CartPage } from "../pages/cartPage"

test('E2E add to cart and checkout', async ({page}) => {
  const homePage = new HomePage(page)
  const productPage = new ProductPage(page)
  const cartPage = new CartPage(page)

  const product: ProductDetails = {
    productName: 'Combination Pliers',
    unitPrice: 14.15,
    category: 'Pliers',
    brand: 'ForgeFlex Tools'
  }

  const desiredQuantity = 3
  const totalItemPrice = product.unitPrice * desiredQuantity

  await homePage.open()
  await homePage.clickProduct(product.productName)
  await expect(productPage.productName).toHaveText(product.productName)
  await expect(productPage.unitPrice).toHaveText(`${product.unitPrice}`)

  await productPage.updateQuantityByInput(desiredQuantity)
  await productPage.clickAddToCart()
  await expect(productPage.navigationHeader.cartQuantity).toHaveText(`${desiredQuantity}`)
  await expect(productPage.navigationHeader.productAddedToast).toHaveText('Product added to shopping cart.')

  await productPage.navigationHeader.goToCart()
  await expect(cartPage.proceedTocheckout).toBeVisible()
  expect(await cartPage.getItemQuantity(product.productName)).toHaveValue(`${desiredQuantity}`)
  expect(await cartPage.getUnitPrice(product.productName)).toHaveText(`$${product.unitPrice}`)
  expect(await cartPage.getTotalItemPrice(product.productName)).toHaveText(`$${totalItemPrice}`)
})