import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { AdminDashboardPage } from '../pages/adminDashboardPage'
import { CustomerDashboardPage } from '../pages/customerDashboardPage'

test('can login with valid admin user', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.open()
    await loginPage.login('admin@practicesoftwaretesting.com', 'welcome01')
    const adminDashboardPage = new AdminDashboardPage(page)
    await expect(adminDashboardPage.signOutLink).toBeEnabled()
    await expect(adminDashboardPage.pageTitle).toHaveText('Sales over the years')
})

test('can login with valid customer user', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.open()
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01')
    const customerDashboardPage = new CustomerDashboardPage(page)
    await expect(customerDashboardPage.signOutLink).toBeEnabled()
    await expect(customerDashboardPage.pageTitle).toHaveText('My account')
})