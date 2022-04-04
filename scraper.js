const puppeteer = require("puppeteer");

const url =
  "https://doobydobap.com/recipe/all-purpose-korean-soy-bbq-marinade#wpzoom-premium-recipe-card";

const scraper = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  //*[@id="wpzoom-premium-recipe-card"]/div[2]/h2
  // pup selector = $x
  const [el] = await page.$x('//*[@id="wpzoom-premium-recipe-card"]/div[2]/h2');
  const text = await el.getProperty("textContent");
  const rawTxt = await text.jsonValue();

  console.log(rawTxt, "txt");

  const [el2] = await page.$x('//*[@id="wpzoom-rcb-ingredient-item-0"]');
  const ul = await el2.getProperties("li");
  console.log(ul);

  browser.close();
};

scraper(url);
