const cheerio = require("cheerio");
const Anime = require("../../models/anime");

const { getAnimeImagesUrl, animeSectionsIndex } = require("../config");

// Function :

module.exports.getLastEpisodes = async (res) => {
  try {
    const $ = cheerio.load(res);

    const data = [];

    const e = $(
      "body > div.page-content-container:nth-child(" +
        animeSectionsIndex.last_episodes +
        ") .episodes-card-container"
    );

    for (let i = 0; i < e.length; i++) {
      const anime_title = $(e[i])
        .find(".ep-card-anime-title h3")
        .first()
        .text();

      const scraped_image = $(e[i])
        .find(".episodes-card img")
        .first()
        .attr("src");

      const anime = await Anime.findOne({ title: anime_title });

      const anime_slug = $(e[i])
        .find(".ep-card-anime-title h3 a")
        .first()
        .attr("href")
        .split("/anime/")[1]
        .replace(/[/]/g, "");

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

      const ep = {
        imageUrl: images.ep_image,
        ep_link: $(e[i])
          .find(".episodes-card .episodes-card-title h3 a")
          .first()
          .attr("href"),

        ep_slug: $(e[i])
          .find(".episodes-card .episodes-card-title h3 a")
          .first()
          .attr("href")
          .split("/episode/")[1]
          .replace(/[/]/g, ""),

        anime_title,
        anime_link: $(e[i])
          .find(".ep-card-anime-title h3 a")
          .first()
          .attr("href"),
        anime_slug,
        ep_number: parseFloat(
          $(e[i])
            .find(".episodes-card .episodes-card-title h3")
            .first()
            .text()
            .replace(/[^0-9.]/g, "")
        ),
        ep_number_text: $(e[i])
          .find(".episodes-card .episodes-card-title h3")
          .first()
          .text(),
      };

      data.push(ep);
    }

    return {
      isEp: true,
      category_title: $(
        "body > div.page-content-container:nth-child(" +
          animeSectionsIndex.last_episodes +
          ") .main-didget-head h3"
      ).text(),
      data,
    };
  } catch (error) {
    console.log(error);
  }
};
