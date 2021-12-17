const { test, expect } = require("@playwright/test");

test.describe("headless block", () => {
  test("test1", async ({ page, browserName }) => {
    test.skip(
      browserName === "firefox",
      "This feature is not implemented for firefox"
    );

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
      page.waitForNavigation({ url: "https://id.qa.posten.no/minside" }),
      page.click('button:has-text("Logg inn")'),
    ]);
  });
});
