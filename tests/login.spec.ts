import { test, expect } from '@playwright/test'
import { LoginPage } from "../pages/loginPage"
import { AdminDashboardPage } from '../pages/adminDashboardPage'
import { CustomerAccountPage } from '../pages/customerDashboardPage'
import { LoginAccount, userCredentials } from '../test-data/loginAccounts'
import { HomePage } from '../pages/homePage'

const validScenarios = [
  { userLogin: userCredentials.admin, userType: userCredentials.admin.userType, expectedPageTitle: 'Sales over the years' },
  { userLogin: userCredentials.customer, userType: userCredentials.customer.userType, expectedPageTitle: 'My account' }
]
validScenarios.forEach(({ userLogin, userType, expectedPageTitle }) => {
  test(`can login with valid ${userType} user`, async ({ page }) => {
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    let dashboardPage: AdminDashboardPage | CustomerAccountPage
    dashboardPage = (userType === 'admin') ?
      new AdminDashboardPage(page) : new CustomerAccountPage(page)

    await homePage.open()
    await homePage.clickSignIn()
    await loginPage.appLogin.login(userLogin)

    await expect(dashboardPage.pageTitle).toHaveText(expectedPageTitle)
    await dashboardPage.openNavigationMenu()
    await expect(dashboardPage.signOut).toBeVisible()
  })
})

const invalidScenarios = [
  { email: userCredentials['admin'].email, password: 'invalidPassword', scenario: 'valid email but incorrect password' },
  { email: 'invalid.email@testing.com', password: 'invalidPassword', scenario: 'incorrect email and password' }
]
invalidScenarios.forEach(({ email, password, scenario }) => {
  test(`unable to login with ${scenario}`, async ({ page }) => {
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)

    await homePage.open()
    await homePage.clickSignIn()
    await loginPage.appLogin.login({ email, password } as LoginAccount)
    await expect(loginPage.appLogin.loginErrorMsg).toHaveText('Invalid email or password')
  })
})
