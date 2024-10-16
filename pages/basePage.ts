import { Page } from "@playwright/test"
import { NavigationHeader } from "./components/navigationHeader"

export class BasePage {
  readonly page: Page
  path: string
  readonly navigationHeader: NavigationHeader

  constructor(page: Page) {
    this.page = page
    this.navigationHeader = new NavigationHeader(page)
  }

  async open() {
    await this.page.goto(this.path)
    await this.page.waitForLoadState("domcontentloaded")
  }
}