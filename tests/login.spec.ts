import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { AdminDashboardPage } from '../pages/adminDashboardPage'
import { CustomerAccountPage } from '../pages/customerDashboardPage'
import { LoginAccount, userCredentials } from '../test-data/loginAccounts'
import { HomePage } from '../pages/homePage'

const validScenarios = [
  { userLogin: userCredentials['admin'] as LoginAccount, userType: 'admin', expectedPageTitle: 'Sales over the years' },
  { userLogin: userCredentials['customer'] as LoginAccount, userType: 'customer', expectedPageTitle: 'My account' }
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
    await loginPage.login(userLogin)

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
    await loginPage.login({ email, password } as LoginAccount)
    await expect(loginPage.loginErrorMsg).toHaveText('Invalid email or password')
  })
})
