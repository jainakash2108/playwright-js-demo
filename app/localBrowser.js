const { chromium, devices } = require("playwright");
const { expect } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });

  const context = await browser.newContext({
    ...devices["iPhone 11 Pro Max"],
  });

  const page = await context.newPage();

  // Go to https://id.qa.posten.no/
  await page.goto("https://id.qa.posten.no/");

  // Click [placeholder="Mobilnummer"]
  await page.click('[placeholder="Mobilnummer"]');
  // Fill [placeholder="Mobilnummer"]
  await page.fill('[placeholder="Mobilnummer"]', "47741178");

  // Click [placeholder="Passord"]
  await page.click('[placeholder="Passord"]');
  // Fill [placeholder="Passord"]
  await page.fill('[placeholder="Passord"]', "Test@1234");

  // Click button:has-text("Logg inn")
  await Promise.all([
    page.waitForNavigation({
      url: "https://id.qa.posten.no/minside",
      waitUntil: "networkidle",
    }),
    page.click('button:has-text("Logg inn")'),
  ]);
})();
