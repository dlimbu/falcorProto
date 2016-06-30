/**
 * Created by Dlimbu on 6/28/16.
 */

requirejs.config({
   baseUrl: 'lib',
   paths: {
      "app": "../app",
      "falcor" : "falcor.browser"
   }
});

requirejs(['app/falcorClient'], function (falcorClient) {
   var fT = new falcorClient.FalcorTest();

   /**
    * No unbounded requests can be made (retrieve object, Array). All requests
    * are made to retrieve paginated data sets that is
    * needed to display the UI.
    *
    * Only allows retrieving of value types i.e leaf node value
    * = This means we have to make targeted hierarchical requests.
    *
    */
   var odPathArray = ["ondemand", "action",
      {
         from: 0,
         to: 2
      },"title"];
   fT.getOndemand(odPathArray);

   odPathArray = ["ondemand", "comedy",
      {
         from: 0,
         to: 3
      },
      ["title","durationMs","imageUrl"]];
   fT.getOndemand(odPathArray);

   odPathArray = ["ondemand", "comedy",
      {
         from: 4,
         to: 6
      },
      ["title","durationMs","imageUrl"]];
   fT.getOndemand(odPathArray);

   odPathArray = ["ondemand", "comedy",
      {
         from: 0,
         to: 3
      },
      ["title","durationMs","imageUrl"]];
   fT.getOndemand(odPathArray);

   odPathArray = ["ondemand", "comedy",
      {
         from: 0, to: 2
      },
      ["tmsId"]];
   fT.getOndemand(odPathArray);

});

