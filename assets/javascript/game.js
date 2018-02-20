var game = ["Assassins Creed", "Bioshock Infinite", "Dark Souls", "Infamous 2", "League of Legends", "Legend of Zelda", "Portal", "Prince of Persia", "Super Mario World", "Undertale"];

$('#add').keypress(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});

$("#adder").on("click", function () {
    $("#1").empty();

    var userChoice = $("#add").val().trim();
    game.push(userChoice);

    list();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        userChoice + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var gameDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gameImage = $("<img>");

                gameDiv.attr("class", "chain");
                p.attr("class", "chain");
                gameImage.attr("src", results[i].images.fixed_height_still.url);
                gameImage.attr("still", results[i].images.fixed_height_still.url);
                gameImage.attr("moving", results[i].images.fixed_height.url);
                gameImage.attr("state", "still");
                gameImage.attr("class", "doStuff");
                gameDiv.append(p);
                gameDiv.append(gameImage);
                $("#3").append(gameDiv);
            }
        });
});

function list() {
    $("#3").empty();
    for (i = 0; i < game.length; i++) {

        var gameChoice = game[i].toString();
        var selectDiv = $("<button>").text(gameChoice);

        selectDiv.attr("class", "choice");
        selectDiv.attr("type", game[i]);
        $("#1").append(selectDiv);

    }
}

$('body').on('click', '.choice', function () {

    $(".choice").on("click", function () {
        $("#3").empty();

        var game = $(this).attr("type");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            game + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;
                for (var i = 0; i < results.length; i++) {

                    var gameDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var gameImage = $("<img>");

                    gameDiv.attr("class", "chain");
                    p.attr("class", "chain");
                    gameImage.attr("src", results[i].images.fixed_height_still.url);
                    gameImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gameImage.attr("data-animate", results[i].images.fixed_height.url);
                    gameImage.attr("data-state", "still");
                    gameDiv.append(p);
                    gameDiv.append(gameImage);
                    $("#3").append(gameDiv);
                }
                $(".chain").on("click", function () {
                    var state = $(this).attr("data-state");
                    var animateUrl = $(this).attr("data-animate");
                    var stillUrl = $(this).attr("data-still");
                    console.log(state);
                    console.log(animateUrl);
                    console.log(stillUrl);
                    if (state === "still") {
                        $(this).attr("src", animateUrl);
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", stillUrl);
                        $(this).attr("data-state", "still");
                    }
                });
            });
    });
});
list();