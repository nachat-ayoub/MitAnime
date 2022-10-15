const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animeSchema = new Schema({
  title: String,
  image_slug: String,
  anime_image: String,
  ep_image: String,
});

const Anime = mongoose.model("Anime", animeSchema);

module.exports = Anime;
