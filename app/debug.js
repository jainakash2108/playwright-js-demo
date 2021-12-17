const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100,
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.pause();

  // Go to https://id.qa.posten.no/
  await page.goto("https://id.qa.posten.no/");
  // Click [placeholder="Mobilnummer"]
  await page.click('[placeholder="Mobilnummer"]');
  // Fill [placeholder="Mobilnummer"]
  await page.fill('[placeholder="Mobilnummer"]', "47741178");
  // Press Tab
  await page.press('[placeholder="Mobilnummer"]', "Tab");
  // Fill [placeholder="Passord"]
  await page.fill('[placeholder="Passord"]', "Test@1234");
  // Press Enter
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://id.qa.posten.no/minside' }*/),
    page.press('[placeholder="Passord"]', "Enter"),
  ]);
})();
