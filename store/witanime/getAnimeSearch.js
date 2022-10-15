const cheerio = require("cheerio");
const Anime = require("../../models/anime");

const {
  config,
  site,
  cloudinary,
  getAnimeImagesUrl,
  axios,
} = require("../config");

// Function :
module.exports.getAnimeSearch = async (query) => {
  try {
    let url = site + "/?search_param=animes&s=" + query;
    console.log(url);

    config.Referer = url;

    const res = await axios.get(url, config);
    const $ = cheerio.load(res.data);

    let data = [];

    if ($(".anime-list-content .anime-card-container").length > 0) {
      const e = $(".anime-list-content .anime-card-container");

      for (let i = 0; i < e.length; i++) {
        const title = $(e[i]).find(".anime-card-details h3 a").first().text();

        const anime = await Anime.findOne({ title });
        const scraped_image = $(e[i])
          .find(".anime-card-poster img")
          .first()
          .attr("src");

        const anime_slug = $(e[i])
          .find(".anime-card-details .anime-card-title h3 a")
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
            title,
            image_slug:
              scraped_image.split("/")[scraped_image.split("/").length - 1],
            anime_image,
            ep_image: ep_image || anime_image,
          });
          newAnime.save();
        }

        data.push({
          story: $(e[i])
            .find(".anime-card-details .anime-card-title")
            .first()
            .attr("data-content"),
          imageUrl: images.anime_image,
          anime_title: title,
          link: $(e[i])
            .find(".anime-card-details .anime-card-title h3 a")
            .first()
            .attr("href"),
          anime_slug,
          status: {
            text: $(e[i])
              .find(".anime-card-poster .anime-card-status a")
              .text(),
            link: $(e[i])
              .find(".anime-card-poster .anime-card-status a")
              .attr("href"),
            slug: $(e[i])
              .find(".anime-card-poster .anime-card-status a")
              .attr("href")
              .split("/anime-status/")[1]
              .replace(/[/]/g, ""),
          },
          type: {
            text: $(e[i]).find(".anime-card-details .anime-card-type a").text(),
            link: $(e[i])
              .find(".anime-card-details .anime-card-type a")
              .attr("href"),
            slug: $(e[i])
              .find(".anime-card-details .anime-card-type a")
              .attr("href")
              .split("/anime-type/")[1]
              .replace(/[/]/g, ""),
          },
        });
      }
    }

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
