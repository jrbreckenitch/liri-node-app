js
require("dotenv").config();


var spotify = new Spotify(keys.spotify);


//make it so liri.js can take in one of the following commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says