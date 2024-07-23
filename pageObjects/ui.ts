import { Page, Locator } from '@playwright/test';

export class TestsUI {
  page: Page;
  username: Locator;
  password: Locator;
  loginButton: Locator;
  getElementsByName: string;
  sortDropdown: string;

  constructor (page: Page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.getElementsByName = '.inventory_item_name';
    this.sortDropdown = '.product_sort_container';
  }
}