import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { AdminDashboardPage } from '../pages/adminDashboardPage'
import { CustomerDashboardPage } from '../pages/customerDashboardPage'
import { LoginAccount, loginAccount } from '../test-data/loginAccounts'

[
  { userLogin: loginAccount['admin'] as LoginAccount, userType: 'admin', expectedPageTitle: 'Sales over the years' },
  { userLogin: loginAccount['customer'] as LoginAccount, userType: 'customer', expectedPageTitle: 'My account' }
].forEach(( {userLogin, userType, expectedPageTitle}) => {
  test.describe(() => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.open()
      await loginPage.login(userLogin)
    })

    test(`can login with valid ${userType} user`, async ({ page }) => {
      let dashboardPage: AdminDashboardPage | CustomerDashboardPage
      if (userType === 'admin') {
        dashboardPage = new AdminDashboardPage(page)
      } else {
        dashboardPage = new CustomerDashboardPage(page)
      }

      await expect(dashboardPage.signOutLink).toBeEnabled()
      await expect(dashboardPage.pageTitle).toHaveText(expectedPageTitle)
    })
  })
})
