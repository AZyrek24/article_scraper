
$(document).ready(function () {
  // Returns to home page, api route runs
  $("#home-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
			method: 'GET',
			url: "/"
		}).then(function() {
			location.reload();			
		})

  })
  // Triggers scrape api route
  $("#scrape-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
			method: 'GET',
			url: "/scrape"
		}).then(function() {
			location.reload();			
		})

  })
  // Triggers saved api route to display all saved articles
  $("#saved-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
			method: 'GET',
			url: "/allSaved"
		}).then(function() {
			location.reload();			
		})

  })
  // Triggers save api route which saves this article
  $("body").on("click", ".save-buttons", function (event) {
    event.preventDefault();
    $.ajax({
			method: 'GET',
			url: "/saved/" + event.target.id
		}).then(function() {
			location.reload();			
		})

  })
  // Triggers clear api route which clears the database of articles
  $("#clear-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
			method: 'GET',
			url: "/clear"
		}).then(function() {
			location.reload();			
		})

  })
})