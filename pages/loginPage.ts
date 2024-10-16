import { Page } from '@playwright/test'
import { BasePage } from './basePage'
import { AppLogin } from './components/appLogin'

export class LoginPage extends BasePage {
  readonly appLogin: AppLogin

  constructor(page: Page) {
    super(page)
    this.appLogin = new AppLogin(page)
  }
}

