/**
 * Created by Dlimbu on 6/28/16.
 */

var falcorExpress = require ('falcor-express');
var Router = require ('falcor-router');
var express = require('express');
var app = express();
var dataSource = require("./dataSource");


var FalcorModel = Router.Model;

app.use(function (req, res, next) {
   /**
    * Important note: when responding to a credentialed request,  server must specify a
    * domain, and cannot use wild carding.  The below example would fail if the header
    * was wildcarded as: Access-Control-Allow-Origin: *.
    */
   res.header('Access-Control-Allow-Origin', 'http://localhost');
   res.header('Access-Control-Allow-Methods', 'GET');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header('Access-Control-Allow-Credentials', 'true');
   next();
});

app.get('/umodel.json', falcorExpress.dataSourceRoute(function (req, res) {

   console.log("Req received !!!");

   console.log("Falcore model ", FalcorModel);
   return new Router ([
      {
         route : "ondemand",
         get: function (pathSet) {
            console.log ("onDemand pathSet: ", pathSet);
            return {
               path: ["ondemand"],
               value: dataSource.onDemand
            }
         }
      },
      {
         /**
          * For specific targeted requests
          * within the unified model.
          */
         route: 'ondemand["action", "comedy", "scifi"]',
         get: function (pathSet) {
            console.log ("pathSet: ", pathSet[1][0]);
            return pathSet[1].map(function (key) {
               var val;
               for (var i = 0; i < dataSource.onDemand.genreList.length; i++) {
                  if (dataSource.onDemand.genreList[i].name === key) {
                     val = dataSource.onDemand.genreList[i];
                     break;
                  }
               }
               console.log("", val);
               return {
                  path : ["ondemand", key],
                  value: val ? val.titles : undefined
               }
            });
         }
      }
   ]);
}));

var root  = __dirname.replace("server","");
app.use('/client', express.static(root + 'client'));

app.listen(8080, function () {
   console.log("Falcor Router started....");
});
