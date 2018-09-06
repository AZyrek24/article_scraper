
$(document).ready(function () {
  $("#scrape-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
			method: 'GET',
			url: "/scrape"
		}).then(function() {
			location.reload();			
		})

  })

  $("#saved-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
			method: 'GET',
			url: "/allSaved"
		}).then(function() {
			location.reload();			
		})

  })

  $("body").on("click", ".save-buttons", function (event) {
    console.log(event);
    event.preventDefault();
    $.ajax({
			method: 'GET',
			url: "/saved/" + event.target.id
		}).then(function() {
			location.reload();			
		})

  })

  $("#clear-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
			method: 'GET',
			url: "/all"
		}).then(function() {
			location.reload();			
		})

  })
})