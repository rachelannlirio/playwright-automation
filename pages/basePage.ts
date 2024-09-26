import { Page } from "@playwright/test"

export class BasePage {
  readonly page: Page
  readonly path: string

  constructor(page: Page) {
    this.page = page
  }

  async open() {
    this.page.goto(this.path)
  }
}