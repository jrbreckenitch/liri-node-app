
require("dotenv").config();
var spotifyKey = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var omdb = require('omdb');
var fs = require("fs");
var APP_ID = "codingbootcamp"
var bandsintown = require('bandsintown')(APP_ID);
var spotify = new Spotify({
    id: process.env.Spotify_ID,
    secret: process.env.Spotify_SECRET});
var userInput = process.argv[2];
var secondInput = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + secondInput + "&y=&plot=short&apikey=trilogy";
var nobodyUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
var bandUrl = "https://rest.bandsintown.com/artists/" + secondInput + "/events?app_id=codingbootcamp";


if (userInput === "concert-this"){
    runBands();
}
// function runOMDB() {
// // request
//   omdb.search(secondInput, function(err, movies) {
//       if(err) {
//           return console.error(err);
//       }
   
//       if(movies.length < 1) {
//           return console.log('No movies were found!');
//       }
   
//       movies.forEach(function(movie) {
//           console.log('%s (%d)', movie.title, movie.year);
//       });
   
//       // Saw (2004)
//       // Saw II (2005)
//       // Saw III (2006)
//       // Saw IV (2007)
//       // ...
//   });
   
//   omdb.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
//       if(err) {
//           return console.error(err);
//       }
   
//       if(!movie) {
//           return console.log('Movie not found!');
//       }
   
//       console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
//       console.log(movie.plot);
   
//       // Saw (2004) 7.6/10
//       // Two men wake up at opposite sides of a dirty, disused bathroom, chained
//       // by their ankles to pipes. Between them lies...
//   });
// };

// Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + secondInput + "&y=&plot=short&apikey=trilogy";
// var bandUrl = "https://rest.bandsintown.com/artists/" + secondInput + "/events?app_id=codingbootcamp";

// // spotify-this-song
else if (userInput === "spotify-this-song") {

    spotifySong();
    // spotify
    // .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    // .then(function(data) {
    //     console.log(data); 
    //   })
    //   .catch(function(err) {
    //     console.error('Error occurred: ' + err); 
    //   });

}
// // movie-this
else if (userInput === "movie-this") {
    findMovie();
}
// // do-what-it-says
else if (userInput === "do-what-it-says") {
    doIt();
};

function spotifySong() {
    spotify.search({ type: 'track', query: secondInput, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }       
    //   console.log(JSON.stringify(data));
    //   console.log(JSON.stringify(data.name)); 
    console.log(JSON.stringify(data)); 
    });
};

function presetSong() {
    spotify.search({ type: 'track', query: 'I want it That Way', limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }       
    //   console.log(JSON.stringify(data));
    //   console.log(JSON.stringify(data.name)); 
    console.log(JSON.stringify(data)); 
    });
};

function findMovie() {
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};

function mrNobody () {
    console.log(nobodyUrl);
    request(nobodyUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

function runBands() {
    bandsintown
// request
  .getArtistEventList('Skrillex')
  .then(function(events) {
    // return array of events
    console.log(events);
  });
}

function doIt(){
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }    
        // Break down all the numbers inside
        data = data.split(", ");
        data[0] = userInput;
        data[1] = secondInput;
    });

    if (userInput === "spotify-this-song"){
        presetSong();
    }
}
