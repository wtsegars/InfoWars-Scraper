const cheerio = require('cheerio');
const axios = require('axios');

axios.get("https://www.infowars.com/").then(function(response) {
    const $ = cheerio.load(response.data);

    let results = [];

    $("article").each(function(i, element) {
        const title = $(element).find("div.article-content").find("h3").find("a").text();

        const image = $(element).find("div.thumbnail").find("a").attr("href");

        const summary = $(element).find("div.article-content").find("h4.entry-subtitle").text();

        const link = $(element).find("div.article-content").find("h3").find("a").attr("href");

        const category = $(element).find("div.article-content").find("div.category-name").find("span.blue-cat").find("a").text();

        results.push({
            title: title,
            image: image,
            summary: summary,
            url: link,
            category: category
        });
    });
    console.log(results);
})