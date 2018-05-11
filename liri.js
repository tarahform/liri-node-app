require("dotenv").config();
var request = require('request');
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var commands = process.argv[2];

switch (commands) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        if (!process.argv[3]) {
            spotifyThisSong("The Sign Ace of Base");
        } else {
            spotifyThisSong(process.argv[3]);
        }
        break;
    case "movie-this":
        if (!process.argv[3]) {
            movie("Mr. Nobody");
        } else {
            movie(process.argv[3]);
        }
        break;
    case "do-what-it-says":
        doWhatISay();
        break;
    default:
        break;
}

// twitter //
function myTweets() {
    var tweetParams = {
        screen_name: "tarahform",
        count: 20
    }
    client.get("statuses/user_timeline", tweetParams, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(i);
                console.log(tweets[i].text);
            }
        } else {
            console.log(error + " You are always wrong");
        }
    })
};
// end of twitter //

// spotify //
function spotifyThisSong(song) {
    spotify.search({
        type: "track",
        query: song
    }, function (error, data) {
        if (!error) {
            console.log("The song name is: " + data.tracks.items[0].name);
            console.log("The artist is: " + data.tracks.items[0].artists[0].name);
            console.log("The album name is: " + data.tracks.items[0].album.name);
            console.log("Here is a link to the song: " + data.tracks.items[0].href);
        } else {
            console.log("Error occurred: " + error);
        }
    });
};
// end of spotify //

// movie-this //
function movie(movie) {
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + movie, function (error, response, body) {
        if (!error) {
            var body = JSON.parse(body);
            console.log("The title of the movie is: " + body.Title);
            console.log("The year it was released: " + body.Year);

            for (var i = 0; i < body.Ratings.length; i++) {
                if (body.Ratings[i].Source === "Internet Movie Database" || body.Ratings[i].Source === "Rotten Tomatoes") {
                    console.log(body.Ratings[i].Source + " rating is: " + body.Ratings[i].Value);
                }
            };
            console.log("Country where the movie was produced is: " + body.Country);
            console.log("Language of the movie is: " + body.Language);
            console.log("Plot of the movie is: " + body.Plot);
            console.log("Actors in the movie are: " + body.Actors);
        } else {
            console.log("Error occurred: " + error);
        }
    });
};
// end of movie-this //

// movie-this //
function doWhatISay() {

};
    // end of movie-this //
