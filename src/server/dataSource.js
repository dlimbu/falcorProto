var uuid = require('node-uuid');
var falcor = require('./falcor');

var comedyMovieObj = {
   "0": {
      tmsId: uuid.v4(),
      title: "Meet The Parents",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1233"
   },

   "1": {
      tmsId: uuid.v4(),
      title: "Death Squad",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1213"
   },

   "2": {
      tmsId: uuid.v4(),
      title: "22 Jump Street",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1244",
      wildling: "I am wildling"
   },
   "3": {
      tmsId: uuid.v4(),
      title: "3 days to Kill",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1255"
   },
   "4": {
      tmsId: uuid.v4(),
      title: "47 Ronin",
      durationMs: 700080,
      imageUrl: "http//imageServer.com/99"
   },
   "5": {
      tmsId: uuid.v4(),
      isEpisode: true,
      title: "Ali",
      durationMs: 70000,
      imageUrl: "http//imageServer.com/9999"
   },
   "6": {
      tmsId: uuid.v4(),
      isSeries: true,
      title: "Ali",
      durationMs: 70000,
      imageUrl: "http//imageServer.com/9999",
      seasons: 7,
      episode: 10
   }
};

var scifiMovies = [
   {
      tmsId: uuid.v4(),
      title: "Matrix",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1233"
   },
   {
      tmsId: uuid.v4(),
      title: "InterSteller",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1213"
   },
   {
      tmsId: uuid.v4(),
      title: "Avatar",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1244",
      wildling: "I am wildling"
   }
];

var $ref = falcor.Model.ref;

var actionMovieList = [
   { $type: "ref", value: ["titlesById", 9292] },
   { $type: "ref", value: ["titlesById", 9293] },
   {
      tmsId: uuid.v4(),
      title: "Death Squad",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1213",
      isMovie: true,
      seasons: 7,
      episode: 10
   },
   {
      tmsId: uuid.v4(),
      title: "22 Jump Street",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1244",
      wildling: "I am wildling"
   },
   {
      tmsId: uuid.v4(),
      title: "3 days to Kill",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1255"
   },
   {
      tmsId: uuid.v4(),
      title: "47 Ronin",
      durationMs: 700080,
      imageUrl: "http//imageServer.com/99"
   },
   {
      tmsId: uuid.v4(),
      title: "Ali",
      durationMs: 70000,
      imageUrl: "http//imageServer.com/9999"
   }
];

var onDemand =  {

   //dedup support.
   titlesById: {
      9292: {
         "tmsId": uuid.v4(),
         "title": "10 cent pistol",
         "durationMs": 90000,
         "imageUrl": "http//imageServer.com/9292"
      },
      9293: {
         "tmsId": uuid.v4(),
         "title": "A-Team",
         "durationMs": 70000,
         "imageUrl": "http//imageServer.com/9293"
      }
   },

   title: "onDemand",
   size: 3,
   genreList: [
      {
         name: "action",
         titles: actionMovieList,
         size: actionMovieList.length
      },
      {
         name: "comedy",
         titles: comedyMovieObj
      },
      {
         name: "scifi",
         titles: scifiMovies,
         size: scifiMovies.length
      }
   ]
};

exports.onDemand = onDemand;