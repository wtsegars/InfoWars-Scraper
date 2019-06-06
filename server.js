const cheerio = require('cheerio');
const axios = require('axios');
const mongoose = require('mongoose');
const express = require('express');
const db = require('./models');

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/infowars", { useNewUrlParser: true });

app.get("/scrape", function(req, res) {
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
    });
    res.send("Scrape Complete");
});
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});