const cheerio = require("cheerio");

const { config, site, axios } = require("../config");

// Function :
module.exports.getEpisodeWatchLink = async (slug) => {
  try {
    let url = encodeURI(site + "/episode/" + slug);
    console.log(url);
    config.Referer = url;
    const res = await axios.get(url, config);
    const $ = cheerio.load(res.data);

    const download_servers = [];

    $(".panel-body .tab-content .quality-list")
      .toArray()
      .map((e) => {
        const download_server_data = {
          quality: $(e).find("li").first().text(),
          servers: $(e)
            .find("li a")
            .toArray()
            .map((li) => {
              return { name: $(li).text(), link: $(li).attr("href") };
            }),
        };
        download_servers.push(download_server_data);
      });

    async function getWatchingServers(url, wl) {
      try {
        const FormData = require("form-data");
        const bodyFormData = new FormData();
        bodyFormData.append("ur", process.env.BASE_SITE_URL);
        bodyFormData.append("wl", wl);
        bodyFormData.append("submit", "submit");

        const { data } = await axios({
          method: "post",
          url,
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        const $$ = cheerio.load(data);

        return {
          active: {
            name: $$("#episode-servers li:nth-child(1) a").text(),
            link: $$("#episode-servers li:nth-child(1) a").attr("data-ep-url"),
          },
          all: $$("#episode-servers li a")
            .toArray()
            .map((e) => {
              return { name: $$(e).text(), link: $$(e).attr("data-ep-url") };
            }),
        };
      } catch (err) {
        console.log(err);
      }
    }

    function getWatchingServers_2() {
      return {
        active: {
          name: $("#episode-servers li:nth-child(1) a").text(),
          link: $("#episode-servers li:nth-child(1) a").attr("data-ep-url"),
        },
        all: $("#episode-servers li a")
          .toArray()
          .map((e) => {
            return { name: $(e).text(), link: $(e).attr("data-ep-url") };
          }),
      };
    }

    const data = {
      animeLink: {
        title: $(".anime-page-link a").first().text(),
        slug: $(".anime-page-link a").first().attr("href").split("/")[4],
      },
      download_servers,
      // old way 1 :
      servers: await getWatchingServers(
        $(".watchForm form").attr("action"),
        $(".watchForm form input[name='wl']").val()
      ),
      // New Way 2 :
      // servers: await getWatchingServers_2(),

      ep_list: {
        active: {
          ep_number: parseFloat(
            $(".all-episodes-list li.episode-active a")
              .text()
              .replace(/[^0-9.]/g, "")
          ),
          ep_text: $(".all-episodes-list li.episode-active a").text(),
          ep_link: $(".all-episodes-list li.episode-active a").attr("href"),
          ep_slug: $(".all-episodes-list li.episode-active a")
            .attr("href")
            .split("/episode/")[1]
            .replace(/[/]/g, ""),
        },

        all: $(".all-episodes-list li a")
          .toArray()
          .map((e) => {
            return {
              ep_number: parseFloat(
                $(e)
                  .text()
                  .replace(/[^0-9.]/g, "")
              ),
              ep_text: $(e).text(),
              ep_link: $(e).attr("href"),
              ep_slug: $(e)
                .attr("href")
                .split("/episode/")[1]
                .replace(/[/]/g, ""),
            };
          }),
      },
    };
    // console.log("\n\n", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
