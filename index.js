const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const PORT = 8000;
const app = express();

//////// this is with cherrio
const url =
  "https://doobydobap.com/recipe/all-purpose-korean-soy-bbq-marinade#wpzoom-premium-recipe-card";

const runAxios = async () => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const ingredients = [];
  $(".ingredient-item", data).each((i, el) => {
    let title = $(el).find("p");
    let txt = $(title).find("span");
    let oneIngredient = {};
    txt.map((unit, i) => {
      let classname = i.attribs.class;
      let key = classname.split("-")[3];

      oneIngredient[key] = i.children[0].data;
    });
    //console.log(oneIngredient);

    ingredients.push(oneIngredient);
  });
  console.log(ingredients);
};

runAxios();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 🚀`);
});
