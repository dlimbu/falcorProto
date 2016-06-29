/**
 * Created by Dlimbu on 6/28/16.
 */

var falcorExpress = require ('falcor-express');
var Router = require ('falcor-router');

var express = require('express');

var uuid = require('node-uuid');
var app = express();

app.get('/umodel.json', falcorExpress.dataSourceRoute(function (req, res) {
   console.log("Req received !!!");
   return new Router ([{
      route : "id",
      get: function () {
         return {
            path: ["id"],
            value: uuid.v4()
         }
      }
   }]);
}));

app.use('/client', express.static('client'));

app.listen(8080, function () {
   console.log("Falcor Router started....");
});


