require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// console.log(spotify);
// console.log(client);

var commands = process.argv[2];

switch (commands) {
    case "my-tweets":
        mytweets();
        break;
    case "spotify-this-song":
        spotify();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        doWhatISay();
        break;
    default:
        break;
}

var params = {
    screen_name: "tarahform",
    count: 20
};

client.get("statuses/user_timeline", params, function (error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(i);
            console.log(tweets[i].text);
        }
    } else {
        console.log(error);
        console.log("you are always right");
    }
});

// function mytweets() {
//     console.log("tweets");
// }

// function spotify() {
//     console.log("spotify");
// }

// function movie() {
//     console.log("movie");
// }

// function doWhatISay() {
//     console.log("do what i say");
// }


// spotify.get();