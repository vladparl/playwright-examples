import { test, expect } from '@playwright/test';
import { TestsUI } from '../../pageObjects/ui';

test.describe('Saucedemo UI', () => {
  let ui: TestsUI;

  test('Verify items sorting', async ({ page }) => {
    ui = new TestsUI(page);

    await page.goto('https://www.saucedemo.com/');
    await ui.username.fill('standard_user');
    await ui.password.fill('secret_sauce');
    await ui.loginButton.click();
  
    await page.waitForSelector(ui.getElementsByName);
    const itemsArrayAZ = await page.$$eval(ui.getElementsByName, elements => elements.map(item => item.textContent));
    const sortedItemsArrayAZ = [...itemsArrayAZ].sort();
    expect(itemsArrayAZ).toEqual(sortedItemsArrayAZ);
  
    await page.selectOption(ui.sortDropdown, { label: 'Name (Z to A)' });

    await page.waitForSelector(ui.getElementsByName);
    const itemsArrayZA = await page.$$eval(ui.getElementsByName, elements => elements.map(item => item.textContent));
    const sortedItemsArrayZA = [...itemsArrayZA].sort().reverse();
    expect(itemsArrayZA).toEqual(sortedItemsArrayZA);
  });
});