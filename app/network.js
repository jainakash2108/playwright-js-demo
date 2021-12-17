const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  context.route("**/*", (route) => {
    if (route.request().resourceType() === "image") {
      route.abort();
    } else {
      route.continue();
    }
  });

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
