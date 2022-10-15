const cheerio = require("cheerio");
const Anime = require("../../models/anime");

const {
  config,
  site,
  cloudinary,
  getAnimeImagesUrl,
  animeSectionsIndex,
} = require("../config");

// Function :

module.exports.getLastAnimes = async (res) => {
  try {
    const $ = cheerio.load(res);

    const data = [];

    const e = $(
      "body > div.page-content-container:nth-child(" +
        animeSectionsIndex.last_animes +
        ") .anime-card-container"
    );
    for (let i = 0; i < e.length; i++) {
      const anime_title = $(e[i]).find(".anime-card-title h3").first().text();

      const anime_slug = $(e[i])
        .find(".anime-card-poster a")
        .first()
        .attr("href")
        .split("/anime/")[1]
        .replace(/[/]/g, "");

      const anime = await Anime.findOne({ title: anime_title });

      const scraped_image = $(e[i])
        .find(".anime-card-poster img")
        .first()
        .attr("src");

      let images = {
        anime_image: null,
        ep_image: null,
      };

      if (anime) {
        images = {
          anime_image: anime.anime_image,
          ep_image: anime.ep_image,
        };
      } else {
        images = await getAnimeImagesUrl(anime_slug);
        const { anime_image, ep_image } = images;
        const newAnime = await Anime.create({
          title: anime_title,
          image_slug:
            scraped_image.split("/")[scraped_image.split("/").length - 1],
          anime_image,
          ep_image,
        });
        newAnime.save();
      }

      // Object :
      const anime_obj = {
        status: {
          text: $(e[i]).find(".anime-card-status a").text(),
          slug: $(e[i])
            .find(".anime-card-status a")
            .attr("href")
            .split("/anime-status/")[1]
            .replace(/[/]/g, ""),
        },
        type: {
          text: $(e[i]).find(".anime-card-type a").text(),
          slug: $(e[i])
            .find(".anime-card-type a")
            .attr("href")
            .split("/anime-type/")[1]
            .replace(/[/]/g, ""),
        },
        anime_title,
        anime_slug,
        imageUrl: images.anime_image,
        anime_link: $(e[i]).find(".anime-card-poster a").first().attr("href"),
        story: $(e[i]).find(".anime-card-title").first().attr("data-content"),
      };

      data.push(anime_obj);
    }
    return {
      isEp: false,
      category_title: $(
        "body > div.page-content-container:nth-child(" +
          animeSectionsIndex.last_animes +
          ") .main-didget-head h3"
      ).text(),
      data,
    };
  } catch (error) {
    console.log(error);
  }
};
