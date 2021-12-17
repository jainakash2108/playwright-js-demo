const { test, expect } = require("@playwright/test");

test("test", async ({ page }) => {
  // Go to https://id.qa.posten.no/
  await page.goto("https://id.qa.posten.no/");
  // Click [placeholder="Mobilnummer"]
  await page.click('[placeholder="Mobilnummer"]');
  // Fill [placeholder="Mobilnummer"]
  await page.fill('[placeholder="Mobilnummer"]', "47741178");
  // Click [placeholder="Passord"]
  await page.click('[placeholder="Passord"]');
  // Click [placeholder="Mobilnummer"]
  await page.click('[placeholder="Mobilnummer"]');
  // Press Tab
  await page.press('[placeholder="Mobilnummer"]', "Tab");
  // Fill [placeholder="Passord"]
  await page.fill('[placeholder="Passord"]', "Test@1234");
  // Click i
  await page.click("i");
  // Click i
  await page.click("i");
  // Click button:has-text("Logg inn")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://id.qa.posten.no/minside' }*/),
    page.click('button:has-text("Logg inn")'),
  ]);
  // Click text=Rediger profil
  await page.click("text=Rediger profil");
  await expect(page).toHaveURL("https://id.qa.posten.no/user#change-profile");
  // Click text=Tilbake til min side
  await page.click("text=Tilbake til min side");
  await expect(page).toHaveURL("https://id.qa.posten.no/minside");
  // Click text=Logg ut
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://id.qa.posten.no/login/20fh5j3lhmyfxo1x57dwrhfqu7dosbusalg6mx2ijsmx5aalvo' }*/),
    page.click("text=Logg ut"),
  ]);
});
