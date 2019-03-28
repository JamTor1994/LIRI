var axios = require("axios");
require("dotenv").config();
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var fs = require("fs")

var command = process.argv[2];

// logic for gathering and storing string for songs, bands, and movie names for searching

var search = process.argv;
var movieName = ""
var bandName = ""
var song = ""
for (var i = 3; i < search.length; i++) {

    if (i > 3 && i < search.length) {
        movieName = movieName + "+" + search[i];
        bandName = bandName + "+" + search[i];
        song = song + "+" + search[i];
    }
    else {
        movieName += search[i];
        bandName += search[i];
        song += search[i];
    }
};
if (movieName.length === 0) {
    movieName = "Mr.Nobody"
}
//omdb function
// omd api key/ layout http://www.omdbapi.com/?i=tt3896198&apikey=8c938da9
if (command === "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=8c938da9"
    // console.log(queryUrl)

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMB Rating: " + response.data.imdbRating);
            console.log("Ratings: " + response.data.Ratings.Source);
            console.log("Country produced: " + response.data.Country);
            console.log("Launguage: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
        // function (error) {
        //     if (error.response) {
        //         console.log(error.response.data)
        //         console.log(error.response.status);
        //         console.log(error.response.headers);
        //     } else if (error.request) {
        //         console.log(error.request);
        //     } else {
        //         console.log("Error", error.message);
        //     }

        // }
    );
};
// // Band function
// // Band with api test "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
if (command === "concert-this") {
    var queryUrl2 = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"
    console.log(queryUrl2)
    axios.get(queryUrl2).then(
        function (response) {
            console.log(response.data)
        }
    )
        .catch(function (error) {
            console.log(error);
        });
};


if (command === "spotify-this") {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].album.name)
        console.log(data.tracks.items[0].album.artists[0].external_urls.spotify)
        console.log(data.tracks.items[0].name)
    });
}
if(command=== "do-what-it-says"){
    fs.readFile("./random.txt","utf8", function(err, data){
        if (err){
            
            console.log(err)
        }
        var cmd = data.split(",")[0]
        var query = data.split(",")[1]
        
        console.log(cmd, query)
        if (cmd === "spotify-this-song") {
            var spotify = new Spotify(keys.spotify);
            spotify.search({ type: 'track', query: query }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log(data.tracks.items[0].album.artists[0].name);
                console.log(data.tracks.items[0].album.name)
                console.log(data.tracks.items[0].album.artists[0].external_urls.spotify)
                console.log(data.tracks.items[0].name)
            });
        }
    })
    
}









// no inquuirer bonus for later
// var inquirer = require('inquirer');
// inquirer
//     .prompt([
//         {
//             type: "list",
//             message: "What is your command?",
//             choices: ["concert-this","spotify-this-song", "movie-this","do-what-it-says"],
//             name: "commands"
//         }
//         {
//             type: "confirm",
//             message: "Are you sure:",
//             name: "conmfirm",
//             default: true
//         }

//     ])
//     .then(answers => {
//         // Use user feedback for... whatever!!
//     });