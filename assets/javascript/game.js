var game = [];

$('#add').keypress(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("adder").click();
        nix();
    }
});

function nix() {
    document.getElementById("presentBreak").click();
}

$("#reset").on("click", function () {
    game = [];
    $("#1").empty();
    $("#2").empty();
    $("#3").empty();
    $("#past").empty();
    $("#pastBreak").removeClass("border");
    document.getElementById("add").value = "";
});


$("#adder").on("click", function () {
    var userChoice = $("#add").val().trim();

    if (userChoice === "") {
        null;
    }
    else {

        document.getElementById("presentBreak").click();

        $("#2").html("<h3>Click an Image to Start/Stop It's Animation</h3>");
        $("#1").empty();

        game.push(userChoice);
        $("#past").html("<h3 class='blue'>Your Past Searches:</h3>");
        $("#pastBreak").addClass("border");

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
                    gameImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gameImage.attr("data-animate", results[i].images.fixed_height.url);
                    gameImage.attr("data-state", "still");
                    gameImage.attr("class", "doStuff");
                    gameDiv.append(p);
                    gameDiv.append(gameImage);
                    $("#3").append(gameDiv);
                }

            });
    }
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
    document.getElementById("add").value = "";
}

$(document).on('click', '.choice', function () {
    $("#2").html("<h3>Click an Image to Start/Stop It's Animation</h3>");
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
                gameImage.attr("class", "doStuff");
                gameDiv.append(p);
                gameDiv.append(gameImage);
                $("#3").append(gameDiv);
            }
        });
});

$(document).on('click', '.doStuff', function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        var animateUrl = $(this).attr("data-animate");
        $(this).attr("src", animateUrl);
        $(this).attr("data-state", "animate");
    } else {
        var stillUrl = $(this).attr("data-still");
        $(this).attr("src", stillUrl);
        $(this).attr("data-state", "still");
    }
});

list();