
require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
// var m = moment();
// var omdb = require('omdb');
var fs = require("fs");
var APP_ID = "codingbootcamp"
var bandsintown = require('bandsintown')(APP_ID);
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret});
var userInput = process.argv[2];
var secondInput = process.argv.slice(3).join(' ');;
var queryUrl = "http://www.omdbapi.com/?t=" + secondInput + "&y=&plot=short&apikey=trilogy";
var nobodyUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
// var bandUrl = "https://rest.bandsintown.com/artists/" + secondInput + "/events?app_id=codingbootcamp";

// concert-this
if (userInput === "concert-this"){
    runBands();
}

// spotify-this-song
if (userInput === "spotify-this-song" && secondInput != "") {
    spotifySong();
}  else if (userInput === "spotify-this-song" && secondInput == "") {
    presetSong();
}

// movie-this
if (userInput === "movie-this" && secondInput != "") {
    findMovie();
} else if (userInput === "movie-this" && secondInput == "") {
    mrNobody();
}

// do-what-it-says
if (userInput === "do-what-it-says") {
    doIt();
};

function spotifySong() {
    spotify.search({ type: 'track', query: secondInput, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }       
    //   console.log(JSON.stringify(data));
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Preview Link: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);
    });
};

function presetSong() {
    spotify.search({ type: 'track', query: 'I want it That Way', limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }       
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
};

function findMovie() {
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
    .getArtistEventList(secondInput)
    .then(function(events) {
    // var date = moment(events[0].datetime);
    // moment(date).isValid();
    console.log(events[0].venue.name);
    console.log(events[0].venue.city + ', ' + events[0].venue.region);
    console.log(events[0].datetime);
    // 2018-09-15T19:30:00
    // console.log(events[0].datetime.utc('2013-09-15', 'HH:mm:ss').format('MM/DD/YYYY'));
    // console.log(events[0].datetime.moment().format('MM/DD/YYYY'));
});
}

function doIt(){
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }    
        // splitting data and assigning new variables
        data = data.split(",");
        userInput = data[0];
        secondInput = data[1];
        spotifySong();
    });
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

// console.log(bandUrl);
    // request(bandUrl, function(error, response, body) {
    // if (!error && response.statusCode === 200) {
    //     console.log(body)
    //     // console.log("Title: " + JSON.parse(body).Title);
    //     // console.log("Release Year: " + JSON.parse(body).Year);
    //     // console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value);
    //     // console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
    //     // console.log("Country: " + JSON.parse(body).Country);
    //     // console.log("Language: " + JSON.parse(body).Language);
    //     // console.log("Plot: " + JSON.parse(body).Plot);
    //     // console.log("Actors: " + JSON.parse(body).Actors);
    //     }
    // });

    // spotify
    // .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    // .then(function(data) {
    //     console.log(data); 
    //   })
    //   .catch(function(err) {
    //     console.error('Error occurred: ' + err); 
    //   });

    // return array of events
    // console.log(events);
//     if (secondInput !== true) {
//         console.log(`We could not find dates for ${secondInput}.`)
//     } else {
//     console.log(events[0].venue.name);
//     console.log(events[0].venue.city + ', ' + events[0].venue.region);
//     console.log(events[0].datetime);
//     }   
//   });

// console.log(bandUrl);
    // request(bandUrl, function(error, response, events) {
    // if (!error && response.statusCode === 200) {
    //     // console.log(events)
    //     console.log(events.offers.type);
    //     // console.log(events[0].venue.city + ', ' + events[0].venue.region);
    //     // console.log(events[0].datetime);
    //     }
    // });