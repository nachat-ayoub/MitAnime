const axios = require("axios");
const cheerio = require("cheerio");

// Site Config:
const config = {
  host: "anime4up.art",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36",
  },
};

// Site Url:
const site = String(process.env.BASE_SITE_URL);

// Cloudinary Config :

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//
//
//
//

const getAnimeImagesUrl = async (slug) => {
  try {
    if (slug) {
      const url = site + "/anime/" + slug;
      config.Referer = url;

      const res = await axios.get(url, config);
      const $ = cheerio.load(res.data);

      const anime_image_url = $(".anime-info-container .anime-thumbnail img")
        .first()
        .attr("src");

      const ep_image_url =
        $(".episodes-card-container .episodes-card img").first().attr("src") ||
        anime_image_url;

      const ep_image = await cloudinary.uploader.upload(ep_image_url, {
        folder: "anime",
      });
      const anime_image = await cloudinary.uploader.upload(anime_image_url, {
        folder: "anime",
      });

      console.log("\n\nanime_image: ", anime_image_url);
      console.log("ep_image: ", ep_image_url, "\n\n");

      const data = {
        anime_image: anime_image.url,
        ep_image: ep_image.url,
      };

      return data;
    }
    return { anime_image: null, ep_image: null };
  } catch (err) {
    console.log(err);
  }
};

const getSliderImage = async (image) => {
  try {
    if (!image) return null;
    return await cloudinary.uploader.upload(image, {
      folder: "anime",
    });
  } catch (err) {
    console.log(err);
  }
};

const animeSectionsIndex = {
  pinned_animes: 4,
  pinned_episodes: 8,
  popular_animes: 10,
  last_episodes: 12,
  last_animes: 14,
};

module.exports = {
  axios,
  animeSectionsIndex,
  cloudinary,
  site,
  config,
  getAnimeImagesUrl,
  getSliderImage,
};
