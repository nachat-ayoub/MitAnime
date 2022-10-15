const cheerio = require("cheerio");
const Anime = require("../../models/anime");

const { config, site, getSliderImage, axios } = require("../config");

// Function :
module.exports.getSliderAnimes = async (res) => {
  try {
    const $ = cheerio.load(res);

    const data = [];
    // {title:, imageUrl:,} owl-item

    const e = $(
      "body div:nth-child(2).owl-carousel .owl-stage-outer .owl-stage .owl-item .item a"
    );
    // console.log(e.length);

    for (let i = 0; i < e.length; i++) {
      const image = $(e[i])
        .css("background-image")
        .slice(4, -1)
        .replace(/["']/g, "");
      const slide_title = $(e[i]).attr("title");
      const ep_slug = $(e[i])
        .attr("href")
        .split("/episode/")[1]
        .replace(/[/]/g, "");

      const image_slug = image.split("/")[image.split("/").length - 1];

      const anime = await Anime.findOne({ image_slug });

      let imageUrl = null;

      if (anime) {
        imageUrl = anime.ep_image || anime.anime_image;
      } else {
        imageUrl = await getSliderImage(image);
        const newAnime = await anime.create({
          title: slide_title,
          image_slug,
          anime_image: imageUrl,
          ep_image: imageUrl,
        });
        newAnime.save();
      }

      data.push({
        slide_title,
        imageUrl,
        ep_slug,
      });
    }

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
