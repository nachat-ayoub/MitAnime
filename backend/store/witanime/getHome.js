const axios = require("axios");

const { config, site } = require("../config");

const { getLastAnimes } = require("./getLastAnimes");
const { getLastEpisodes } = require("./getLastEpisodes");
const { getPinnedAnimeEpisodesList } = require("./getPinnedAnimeEpisodesList");
const { getPinnedAnimes } = require("./getPinnedAnimes");
const { getPopularAnimes } = require("./getPopularAnimes");
const { getSliderAnimes } = require("./getSliderAnimes");

// Function :
module.exports.getHome = async () => {
  try {
    let url = site;

    config.Referer = url;

    const res = await axios.get(url, config);

    const data = {
      // slider: await getSliderAnimes(res.data),
      pinned_animes: await getPinnedAnimes(res.data),
      pinned_episodes: await getPinnedAnimeEpisodesList(res.data),
      popular_animes: await getPopularAnimes(res.data),
      last_episodes: await getLastEpisodes(res.data),
      last_animes: await getLastAnimes(res.data),
    };
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
