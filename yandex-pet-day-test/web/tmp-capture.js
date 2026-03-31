import { chromium } from 'playwright';
(async()=>{
 const browser=await chromium.launch({headless:true});
 const specs=[
  ['main-1120.png',1120,1800,'http://192.168.31.132:3000/variant-a'],
  ['main-1024.png',1024,1800,'http://192.168.31.132:3000/variant-a'],
  ['main-768.png',768,2400,'http://192.168.31.132:3000/variant-a'],
  ['main-430.png',430,2800,'http://192.168.31.132:3000/variant-a'],
  ['figma-768.png',768,2600,'http://192.168.31.132:3000/variant-a-figma'],
  ['figma-430.png',430,3200,'http://192.168.31.132:3000/variant-a-figma']
 ];
 for (const [name,w,h,url] of specs){
  const page=await browser.newPage({viewport:{width:w,height:h}});
  await page.goto(url,{waitUntil:'networkidle',timeout:120000});
  await page.screenshot({path:`C:/Users/frolo/Documents/Playground/yandex-pet-day-test/web/output/playwright/${name}`, fullPage:true});
  await page.close();
 }
 await browser.close();
})();
