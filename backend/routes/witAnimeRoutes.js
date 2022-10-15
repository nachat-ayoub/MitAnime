const { Router } = require("express");
const router = Router();

const {
  getEpisodeWatchLink,
} = require("../store/witanime/getEpisodeWatchLink");

const { getHome } = require("../store/witanime/getHome");

const { getAnime } = require("../store/witanime/getAnime");

const { getAnimeSearch } = require("../store/witanime/getAnimeSearch");
const { getAnimeList } = require("../store/witanime/getAnimeList");

//
//
//
// All Animes Categories :
router.get("/home", async (req, res) => {
  try {
    const data = await getHome();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});
//
//
//
// Search For Anime :
router.get("/search", async (req, res) => {
  try {
    const data = await getAnimeSearch(req.query.s || "");
    res.status(200).json({ data, notFound: data.length > 0 ? false : true });
  } catch (err) {
    console.log(err);
  }
});

//
//
//
// Anime Page:
router.get("/anime/:slug", async (req, res) => {
  try {
    const data = await getAnime(req.params.slug);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

//
//
//

// Watch:
router.get("/watch/:slug", async (req, res) => {
  try {
    const data = await getEpisodeWatchLink(req.params.slug);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

// Anime List:
router.get("/animes/page/", (req, res) => {
  res.redirect("/api/animes");
});
// Anime List:
router.get("/animes/page/:pageNumber", async (req, res) => {
  try {
    let { pageNumber } = req.params;
    pageNumber = parseInt(pageNumber);

    if (Number.isNaN(pageNumber)) res.redirect("/api/animes");
    else {
      const data = await getAnimeList(pageNumber);
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/animes", async (req, res) => {
  try {
    const data = await getAnimeList(1);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

// Docs
router.get("/docs", async (req, res) => {
  try {
    res.send(`
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Anime Api</title>

       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/an-old-hope.min.css" integrity="sha512-t47CjkEB5hx4FojnE73dBLwgrgvLBpgsHvB40ycK3cYPkLwEp7qNHyRpRDA3/zVVAAOUPJwbMVJq3uJrBqpHVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

       <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js" integrity="sha512-IaaKO80nPNs5j+VLxd42eK/7sYuXQmr+fyywCNA0e+C6gtQnuCXNtORe9xR4LqGPz5U9VpH+ff41wKs/ZmC3iA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
       <script>hljs.highlightAll();</script>
    </head>
    <body>
      <div class="container py-5">
        <pre><code class="language-shell  ">
          // fetch Home Categories :
          
          $ curl GET http://${req.headers.host}/api/home
        </code></pre>

        <pre><code class="language-shell  ">
          // fetch Anime List Based On Page Number :

          $ curl GET http://${req.headers.host}/api/animes/page/:pageNumber
        </code></pre>
        
        <pre><code class="language-shell  ">
          // fetch Anime Watching Servers Based On Slug :

          $ curl GET http://${req.headers.host}/api/watch/:slug
        </code></pre>
        
        <pre><code class="language-shell  ">
          // fetch Anime Page Info Based On Slug :

          $ curl GET http://${req.headers.host}/api/anime/:slug
        </code></pre>
        
        <pre><code class="language-shell  ">
          // fetch Anime Search Results Based On Search Query :

          $ curl GET http://${req.headers.host}/api/search/?s=search-query
        </code></pre>
          

      </div>
    </body>
    </html>
    `);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
