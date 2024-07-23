# Playwright Automation Tests

Test suite designed to execute Playwright automated tests for both API and UI.

## Run tests locally

### Setup

1. Install VS Code.
2. Clone the project repository.
3. Run `npm install` to install project dependencies.
4. Execute the desired script from the "Scripts" section

Example:
`npm run test:chromium:headless`

#### Scripts

1. **test:chromium:headless** - Executes both API and UI tests in headless mode using the Chromium browser.
2. **test:chromium:headful** - Executes both API and UI tests in headed mode using the Chrome browser.
3. **test:api:chromium:headless** - Executes API tests in headless mode using the Chromium browser.
4. **test:ui:chromium:headless** - Executes UI tests in headless mode using the Chromium browser.
5. **test:ui:chromium:headfull** - Executes UI tests in headed mode using the Chrome browser.
6. **test:firefox:headless** - Executes both API and UI tests in headless mode using the Firefox browser.
7. **test:firefox:headful** - Executes both API and UI tests in headed mode using the Firefox browser.
8. **test:api:firefox:headless** - Executes API tests in headless mode using the Firefox browser.
9. **test:ui:firefox:headless** - Executes UI tests in headless mode using the Firefox browser.
10. **test:ui:firefox:headfull** - Executes UI tests in headed mode using the Firefox browser.
11. **test:report** - Opens an HTML report.

## Run tests on CI

### Download the report and check the results
