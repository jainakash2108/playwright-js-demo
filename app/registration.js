const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });
  const context = await browser.newContext({
    recordVideo: {
      dir: "../data",
      size: {
        width: 1024,
        height: 1024,
      },
    },
  });

  const page = await context.newPage();

  // Go to https://id.qa.posten.no/
  await page.goto("https://id.qa.posten.no/");

  // Click text=Registrer deg
  await page.click("text=Registrer deg");

  // Fill [placeholder="Mobilnummer"]
  await page.fill('[placeholder="Mobilnummer"]', "94720783");

  // Click text=Send kode på sms
  await page.click("text=Send kode på sms");

  // wait for 30 seconds
  await page.waitForTimeout(15000);

  // Click text=Fortsett
  await page.click("text=Fortsett");

  // Fill [placeholder="Fornavn"]
  await page.fill('[placeholder="Fornavn"]', "akash");

  // Fill [placeholder="Etternavn"]
  await page.fill('[placeholder="Etternavn"]', "jain");

  // Fill [placeholder="E-post"]
  await page.fill('[placeholder="E-post"]', "akash.jain3@tcs.com");

  // Fill [placeholder="Passord"]
  await page.fill('[placeholder="Passord"]', "Test@1234");

  // Fill [placeholder="Gjenta Passord"]
  await page.fill('[placeholder="Gjenta Passord"]', "Test@1234");

  // Click i
  await page.click("i");

  // Click :nth-match(i, 2)
  await page.click(":nth-match(i, 2)");

  // Click text=Fortsett
  await page.click("text=Fortsett");

  // Click i
  await page.click("i");

  // Click :nth-match(i, 2)
  await page.click(":nth-match(i, 2)");

  // Click text=Fullfør registrering
  await page.click("text=Fullfør registrering");

  await page.waitForTimeout(10000);

  // Click text=Rediger profil
  await page.click("text=Rediger profil");

  // Click text=Slett bruker
  await page.click("text=Slett bruker");

  // Click button:has-text("Slett brukerkonto")
  await page.click('button:has-text("Slett brukerkonto")');

  // ---------------------
  //  await context.close();
  //await browser.close();
})();
