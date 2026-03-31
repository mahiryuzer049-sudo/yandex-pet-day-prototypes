import { chromium } from 'playwright';
(async()=>{
  const browser=await chromium.launch({headless:true});
  const cases=[
    {w:1100,h:900,name:'header-1100'},
    {w:1024,h:900,name:'header-1024'},
    {w:980,h:900,name:'header-980'},
    {w:768,h:900,name:'header-768'}
  ];
  for (const c of cases){
    const page=await browser.newPage({viewport:{width:c.w,height:c.h}});
    await page.goto('http://192.168.31.132:3000/variant-a', {waitUntil:'networkidle'});
    await page.screenshot({path:`C:/Users/frolo/Documents/Playground/yandex-pet-day-test/web/output/playwright/${c.name}.png`});
    const data=await page.evaluate(()=>{
      const header=document.querySelector('header');
      const bar=document.querySelector('[class*="headerBar"]');
      const nav=document.querySelector('[class*="navLinks"]');
      const actions=document.querySelector('[class*="headerActions"]');
      const btn=actions?.querySelector('a[href="#registration"]');
      const brand=document.querySelector('[class*="brand"]');
      const rect=(el)=>el?el.getBoundingClientRect():null;
      return {header:rect(header),bar:rect(bar),nav:rect(nav),actions:rect(actions),btn:rect(btn),brand:rect(brand),scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth};
    });
    console.log(c.name, JSON.stringify(data));
    await page.close();
  }
  await browser.close();
})();
