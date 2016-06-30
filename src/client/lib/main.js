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
    * Note:
    * No unbounded requests can be made (retrieve object, Array). All requests
    * are made to retrieve paginated leaf node data sets that is
    * needed to display the UI.
    * 
    * It is only legal to retrieve value types from a JSON Graph object.
    * Recall that these are the JSON value types:
    * - null
    * - string
    * - number
    * - true
    * - false
    *
    * Only allows retrieving of value types i.e leaf value's
    *
    * e.g.
    *    var onDemand =  {
    *       title: "onDemand",
    *       size: 3,
    *       genreList: [
    *         {
    *           name: "action",
    *           titles: actionMovieList,
    *           size: actionMovieList.length
    *         }
    *         .........
    *       ]
    *    };
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
    *
    * HTTP request
    */
   odPathArray = ["ondemand", "action",
      {
         from: 0,
         to: 2
      },["title", "tmsId","durationMs","imageUrl"]];
   fT.getOndemand(odPathArray);

   /**
    * Retrieve action carousel data with 3 item.
    * with just titles.
    *
    * No HTTP request i.e. data from cache.
    */
   odPathArray = ["ondemand", "action",
      {
         from: 0,
         to: 2
      },"title"];
   fT.getOndemand(odPathArray);

   /**
    * Retrieve action carousel 2 item, with title and imageUrl only.
    * No HTTP request i.e. data from cache.
    */
   var atIndex = 2;
   odPathArray = ["ondemand", "action", atIndex , ["title", "imageUrl"]];
   fT.getOndemand(odPathArray);

//
// TODO: And operation to make multi level call, i.e. aggregate properties from different levels in hierarchy.
// E.g. get(
//   "genrelists[0..3].name",
//      "genrelists[0..3].titles[0..4]['name','boxshot']")

//   var odPathArray =["ondemand", "action", "genreList", {from: 0, to: 3}, "titles", {from:0, to:4}, ['title','tmsId','imageUrl']];
//   var odPathString = "ondemand.action.genreList[0..3].name";
//   var odPathString2 = "ondemand.action.genreList[0..3].tiot"
//   fT.getOndemand(odPathArray);
//

   /**
    * Retrieve action carousel data with 3 item.
    * with just titles.
    *
    * No HTTP request i.e. data from cache.
    */
   odPathArray = ["ondemand", "action",
      {
         from: 0,
         to: 2
      },["title", "durationMs"]];
   fT.getOndemand(odPathArray);

   /**
    * Retrieve comedy carousel data with 4 item.
    * with just 3 attributes
    *
    * HTTP request
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
    *
    * HTTP request
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
    *
    * ["title", "durationMs", "imageUrl"] for 0-3 is
    * already fetched.
    *
    * No diffing algorithm to make delta requests
    * or requests for only those attribute that is not
    * in the cache. So its advised to make a requests
    * with all the attributes a view needs one time and
    * then work from cache.
    *
    * HTTP request
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
    * No HTTP request i.e. data from cache.
    */
   odPathArray = ["ondemand", "comedy",
      {
         from: 0,
         to: 2
      },
      ["tmsId"]];
   fT.getOndemand(odPathArray);

});

