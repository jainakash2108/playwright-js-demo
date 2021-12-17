const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  //miniaddDatabase
  const adsDB = [
    "https://adservice.google.com",
    "https://adservice.google.co.nz",
    "https://partner.googleadservices.com",
    "https://googleads.g.doubleclick.net",
    "https://www.googletagservices.com",
    "https://stats.g.doubleclick.net",
    "https://c.amazon-adsystem.com",
    "https://pagead2.googlesyndication.com",
    "https://idsync.rlcdn.com",
    "https://googleads.g.doubleclick.net",
    "https://jogger.zdbb.net",
    "https://zdbb.net",
    "https://ib.adnxs.com",
    "https://securepubads.g.doubleclick.net",
    "https://dt.adsafeprotected.com",
    "https://as-sec.casalemedia.com",
  ];

  await page.route("**/*", (route) => {
    const url = route.request().url();

    if (adsDB.some((d) => url.startsWith(d))) route.abort();
    else route.continue();
  });

  await page.goto("https://filehippo.com/");

  //await browser.close();
})();
