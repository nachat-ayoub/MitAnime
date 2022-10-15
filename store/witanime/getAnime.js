const cheerio = require("cheerio");
const Anime = require("../../models/anime");

const { config, site, cloudinary, axios } = require("../config");

// Function :

module.exports.getAnime = async (slug) => {
  try {
    let url = site + "/anime/" + slug;
    console.log(url);
    config.Referer = url;
    const res = await axios.get(url, config);
    const $ = cheerio.load(res.data);

    const title = $(".anime-info-container h1.anime-details-title").text();

    const anime = await Anime.findOne({ title });
    const scraped_image = $(".anime-info-container .anime-thumbnail img").attr(
      "src"
    );

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
      const anime_image = await cloudinary.uploader.upload(scraped_image, {
        folder: "anime",
      });
      const ep_image = await cloudinary.uploader.upload(
        $(".episodes-card-container .episodes-card img").first().attr("src"),
        { folder: "anime" }
      );
      images = {
        ep_image: ep_image.url,
        anime_image: anime_image.url,
      };
      const newAnime = await Anime.create({
        title,
        image_slug:
          scraped_image.split("/")[scraped_image.split("/").length - 1],
        anime_image: images.anime_image,
        ep_image: images.ep_image,
      });
      newAnime.save();
    }

    const data = {
      slug,
      images,
      title,
      trailer: $(".anime-external-links .anime-trailer").attr("href"),
      MAL: $(".anime-external-links .anime-mal").attr("href"),
      genre: $(".anime-info-container .anime-genres li a")
        .toArray()
        .map((e) => {
          return {
            slug: $(e)
              .attr("href")
              .split("/anime-genre/")[1]
              .replace(/[/]/g, ""),
            text: $(e).text(),
          };
        }),
      story: $(".anime-info-container .anime-story").text(),
      eps_number:
        parseFloat(
          $(".anime-info-container div.row > div:nth-child(4) > div")
            .text()
            .replace(/[^0-9]/g, "")
        ) ||
        $(".episodes-list-content .episodes-card-container .episodes-card")
          .length,
      anime_status: {
        slug: $(".anime-info-container div.row > div:nth-child(3) > div a")
          .attr("href")
          .split("/anime-status/")[1]
          .replace(/[/]/g, ""),
        text: $(
          ".anime-info-container div.row > div:nth-child(3) > div a"
        ).text(),
      },
      anime_type: {
        slug: $(
          "body > div.second-section > div > div > div.anime-info-left > div > div.row > div:nth-child(1) > div a"
        )
          .attr("href")
          .split("/anime-type/")[1]
          .replace(/[/]/g, ""),
        text: $(
          "body > div.second-section > div > div > div.anime-info-left > div > div.row > div:nth-child(1) > div a"
        ).text(),
      },

      episodes: $(
        ".episodes-list-content .episodes-card-container .episodes-card"
      )
        .toArray()
        .reverse()
        .map((e) => {
          return {
            ep_number: parseFloat(
              $(e)
                .find(".episodes-card-title h3 a")
                .text()
                .replace(/[^0-9.]/g, "")
            ),
            ep_text: $(e).find(".episodes-card-title h3 a").text(),
            // ep_link: $(e).find(".episodes-card-title h3 a").attr("href"),
            ep_slug: $(e)
              .find(".episodes-card-title h3 a")
              .attr("href")
              .split("/episode/")[1]
              .replace(/[/]/g, ""),
          };
        }),
    };
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
