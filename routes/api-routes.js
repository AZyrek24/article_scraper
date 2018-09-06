// Required Models
var db = require("../models");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio")

// Routes
// ==================================================================================================================
module.exports = function (app) {

  app.get("/", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.render("index", { dbArticle })
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  

  // GET route scrapes NY Times website
  app.get("/scrape", function (req, res) {
    
    axios.get("https://www.nytimes.com/section/us").then(function (response) {

      var $ = cheerio.load(response.data);

      $("div", ".story-menu").each(function (i, element) {
        
        var result = {};

        result.title = $(this)
          .find("h2.headline")
          .text();
        result.summary = $(this)
          .find("p.summary")
          .text();
        result.link = $(this)
          .find("a.story-link")
          .attr("href");
        result.img = $(this)
          .find("img")
          .attr("src");

        // Create a new Article
        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });

    });
  });

  app.get("/saved", function(req, res) {
    db.Article.find({saved: true}).then(function(dbArticles) {
      console.log("DOCS with value of true", dbArticles);
  
      res.render("saved", {articles: dbArticles});
    })
  })

}

