/**
 * Created by Dlimbu on 6/28/16.
 */
/**
 *
 * @type {exports}
 */
var falcorExpress = require ('falcor-express');
var Router = require ('falcor-router');

var express = require('express');

var uuid = require('node-uuid');
var app = express();


var item =  {
   tmsId: 1233,
   title: "10 cent pistol",
   durationMs: 90000,
   imageUrl: "http//imageServer.com/1233"
};

var actionMovieList = [
   {
      tmsId: 1233,
      title: "10 cent pistol",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1233"
   },
   {
      tmsId: 1213,
      title: "Death Squad",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1213"
   },
   {
      tmsId: 1244,
      title: "22 Jump Street",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1244",
      wildling: "I am wildling"
   },
   {
      tmsId: 1255,
      title: "3 days to Kill",
      durationMs: 90000,
      imageUrl: "http//imageServer.com/1255"
   },
   {
      tmsId: 99,
      title: "47 Ronin",
      durationMs: 700080,
      imageUrl: "http//imageServer.com/99"
   },
   {
      tmsId: 9999,
      title: "Ali",
      durationMs: 70000,
      imageUrl: "http//imageServer.com/9999"
   }
];

app.get('/umodel.json', falcorExpress.dataSourceRoute(function (req, res) {

   console.log("Req received !!!");

   return new Router ([
      {
         route : "id",
         get: function (pathSet) {
            return {
               path: ["id"],
               value: uuid.v4()
            }
         }
      },

      {
         route: "ondemand.action",
         get: function (pathSet) {
            console.log ("onDemand.action pathSet: ", pathSet);
            return {
               path:["ondemand", "action"],
               value: actionMovieList
            }
         }
      }
   ]);
}));

var root  = __dirname.replace("server","");
app.use('/client', express.static(root + 'client'));

app.listen(8080, function () {
   console.log("Falcor Router started....");
});

/**
 * TODO:
 * 1. Enable CORS.
 */
