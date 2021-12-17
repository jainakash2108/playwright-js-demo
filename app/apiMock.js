const { chromium } = require("playwright");

const mockData = {
  firstName: "Kanishk",
  lastName: "Jain",
  hasNin: false,
  phone: "+4794720783",
  email: { emailAddress: "akash.jain@posten.com", verified: true },
  subject: "0794c6e94e97412a9252aed25fac6b58",
  consent: { hasConsent: true, consentEpost: false, consentSms: false },
  paymentCards: [],
  secondaryNumbers: [],
};

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  await page.route("https://id.qa.posten.no/user/api/profile", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockData),
    })
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
    page.waitForNavigation({
      url: "https://id.qa.posten.no/minside",
      waitUntil: "networkidle",
    }),
    page.click('button:has-text("Logg inn")'),
  ]);

  //await browser.close();
})();
