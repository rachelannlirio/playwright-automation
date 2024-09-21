import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { AdminDashboardPage } from '../pages/adminDashboardPage'

test.only('can login with valid admin user', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.open()
    await loginPage.login('admin@practicesoftwaretesting.com', 'welcome01')
    const adminDashboardPage = new AdminDashboardPage(page)
    await expect(adminDashboardPage.signOutLink).toBeEnabled()
})