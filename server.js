const cheerio = require('cheerio');
const axios = require('axios');
const mongoose = require('mongoose');
const express = require('express');
const db = require('./models');
const exphbs = require('express-handlebars');

const PORT = 8889;

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//mongoose.connect("mongodb://localhost:27017/infowarsdb", { useNewUrlParser: true });

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/infowarddb";

mongoose.connect(MONGODB_URI);

app.get("/", function(req, res) {
    db.Article.find({}).populate("comment").then(function(dbarticle){
        res.render("index", {article: dbarticle});
    }).catch(function(err){
        res.json(err);
    });
});

app.get("/scrape", function(req, res) {
    axios.get("https://www.infowars.com/").then(function(response) {
    const $ = cheerio.load(response.data);

    let results = [];

    $("article").each(function(i, element) {
        const title = $(element).find("div.article-content").find("h3").find("a").text();
        const image = $(element).find("div.thumbnail").find("a").find("img").attr("src");
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

        db.Article.create(results).then(function(dbArticle) {
            console.log(dbArticle);
        }).catch(function(err) {
            console.log(err);
        });
    });
    console.log(results);
    });
    res.send("Scrape Complete");
});

app.get("/articles", function(req, res){
    db.Article.find({}).populate("comment").then(function(dbarticle){
        res.json(dbarticle);
    }).catch(function(err){
        res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
    db.Article.findOne({_id: req.params.id }).populate("comment").then(function(dbarticle) {
        res.json(dbarticle);
    }).catch(function(err){
        res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
    console.log(req.params.id);
    db.Comment.create(req.body).then(function(dbComment) {
        return db.Article.findOneAndUpdate({_id: req.params.id}, { comment: dbComment._id }, { new: true});
    }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.get("/comments", function(req, res) {
    db.Comment.find({}).populate("comment").then(function(dbarticle) {
        console.log(dbarticle);
        res.json(dbarticle);
    }).catch(function(err){
        res.json(err);
    });
});

app.post("/comment", function(req, res) {
    db.Comment.find({}).populate("comment").then(function(dbComment) {
        return db.Article.find({ title: dbComment.title }, { author: dbComment.author }, { comment: dbComment.comment});
    }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err){
        res.json(err);
    });
});

// app.listen(PORT, function() {
//     console.log("App running on port " + PORT + "!");
// });

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });