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
    * Only allows retrieving of value types i.e leaf node value's
    */

   /**
    * Retrieve the top level info i.e. top level attributes of
    * onDemand data.
    *
    * We can't retrieve the Object and array types as they are
    * considered unbounded. e.g. ["ondemand", "genreList"];
    */
   var odPathArray = ["ondemand", ["title", "size"]];
   fT.getOndemand(odPathArray);

   /**
    * Retrieve action carousel data with 3 item.
    * with all attributes defined in the data set
    * for each boxArts.
    */
   odPathArray = ["ondemand", "action",
      {
         from: 0,
         to: 2
      },"title", "tmsId","durationMs","imageUrl"];
   fT.getOndemand(odPathArray);

   /**
    * Retrieve action carousel data with 3 item.
    * with just titles.
    */
   odPathArray = ["ondemand", "action",
      {
         from: 0,
         to: 2
      },"title"];
   fT.getOndemand(odPathArray);

   /**
    * Retrieve comedy carousel data with 4 item.
    * with just 3 attributes
    */
   odPathArray = ["ondemand", "comedy",
      {
         from: 0,
         to: 3
      },
      ["title", "durationMs", "imageUrl"]];
   fT.getOndemand(odPathArray);

   /**
    * Paginated request WRT above.
    * Retrieve comedy carousel data with 2 items.
    * with just 3 attributes
    */
   odPathArray = ["ondemand", "comedy",
      {
         from: 4,
         to: 6
      },
      ["title", "durationMs", "imageUrl"]];
   fT.getOndemand(odPathArray);

   /**
    * Make the same 0..3 data requests for Comedy
    * but with additional attributes.
    */
   odPathArray = ["ondemand", "comedy",
      {
         from: 0,
         to: 3
      },
      ["title", "durationMs", "imageUrl", "tmsId"]];
   fT.getOndemand(odPathArray);

   /**
    * Make the same 0..2 data requests for Comedy
    * just with tmsId.
    */
   odPathArray = ["ondemand", "comedy",
      {
         from: 0,
         to: 2
      },
      ["tmsId"]];
   fT.getOndemand(odPathArray);

});

