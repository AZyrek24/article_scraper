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

  app.get("/saved/:id", function(req, res) {
    var request = req.params.id;
    var id = {_id: request}
    db.Article.findOneAndUpdate(id, {$set: {saved: true}}).then(function(dbArticle) {
  
      res.render("index", {dbArticle});
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      return res.json(err);
    });
  })

  app.get("/allSaved", function(req, res) {
    db.Article.find({saved: true}).then(function(dbArticle) {
  
      res.render("saved", {dbArticle});
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  })

  app.get("/clear", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.deleteMany({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.render("index", { dbArticle })
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

}

