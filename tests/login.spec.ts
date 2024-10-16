import { expect, test } from '@playwright/test'
import { AdminDashboardPage } from '../pages/adminDashboardPage'
import { CustomerDashboardPage } from '../pages/customerDashboardPage'
import { HomePage } from '../pages/homePage'
import { LoginPage } from "../pages/loginPage"
import { LoginAccount, userAccounts } from '../test-data/userAccounts'

const validScenarios = [
  { userLogin: userAccounts.admin.loginAccount, expectedPageTitle: 'Sales over the years' },
  { userLogin: userAccounts.customer.loginAccount, expectedPageTitle: 'My account' }
]
validScenarios.forEach(({ userLogin, expectedPageTitle }) => {
  test(`can login with valid ${userLogin.userType} user`, async ({ page }) => {
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    let dashboardPage: AdminDashboardPage | CustomerDashboardPage
    dashboardPage = (userLogin.userType === 'admin') ?
      new AdminDashboardPage(page) : new CustomerDashboardPage(page)

    await homePage.open()
    await homePage.navigationHeader.clickSignIn()
    await loginPage.appLogin.login(userLogin)

    await expect(dashboardPage.pageTitle).toHaveText(expectedPageTitle)
    await dashboardPage.openNavigationMenu()
    await expect(dashboardPage.signOut).toBeVisible()
  })
})

const invalidScenarios = [
  { email: userAccounts.admin.loginAccount.email, password: 'invalidPassword', scenario: 'valid email but incorrect password' },
  { email: 'invalid.email@testing.com', password: 'invalidPassword', scenario: 'incorrect email and password' }
]
invalidScenarios.forEach(({ email, password, scenario }) => {
  test(`unable to login with ${scenario}`, async ({ page }) => {
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)

    await homePage.open()
    await homePage.navigationHeader.clickSignIn()
    await loginPage.appLogin.login({ email, password } as LoginAccount, false)
    await expect(loginPage.appLogin.loginErrorMsg).toHaveText('Invalid email or password')
  })
})
