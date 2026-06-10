import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5174/');
  
  // click "SaaS及服务"
  await page.click('text=SaaS及服务');
  await page.waitForTimeout(1000);
  
  // click "收银系统与SaaS软件"
  await page.click('text=收银系统与SaaS软件');
  await page.waitForTimeout(1000);

  // try to scroll
  await page.mouse.wheel({ deltaY: 500 });
  await page.waitForTimeout(1000);

  // take screenshot
  await page.screenshot({ path: 'test1.png' });

  await page.mouse.wheel({ deltaY: 500 });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'test2.png' });

  await browser.close();
})();
