const cheerio = require("cheerio");
const Anime = require("../../models/anime");

const { config, site, axios, getAnimeImagesUrl } = require("../config");

// Function :
module.exports.getAnimeList = async (pageNumber) => {
  try {
    const data = [];

    let url = encodeURI(site + `/قائمة-الانمي/page/${pageNumber}/`);

    if (pageNumber === 1) url = url.split("/page/")[0];

    console.log(url);

    config.Referer = url;

    const res = await axios.get(url, config);
    const $ = cheerio.load(res.data);

    const e = $(".anime-card-container");

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

      if (!anime) {
        const { anime_image, ep_image } = await getAnimeImagesUrl(anime_slug);
        const newAnime = await Anime.create({
          title: anime_title,
          image_slug:
            scraped_image.split("/")[scraped_image.split("/").length - 1],
          anime_image,
          ep_image,
        });
        newAnime.save();
        images = { anime_image, ep_image };
      } else {
        images = {
          anime_image: anime.anime_image,
          ep_image: anime.ep_image,
        };
      }

      data.push({
        anime_title,
        anime_slug,
        imageUrl: images.anime_image,
        anime_link: $(e[i]).find(".anime-card-poster a").first().attr("href"),
        story: $(e[i]).find(".anime-card-title").first().attr("data-content"),
      });
      console.log("\n(" + i + 1 + ")===> Anime Done " + anime_title);
    }

    console.log(
      "\n<<<<<<<<<<<----[ page " + pageNumber + " Done ]---->>>>>>>>>>\n\n"
    );

    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
