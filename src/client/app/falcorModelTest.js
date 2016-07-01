/**
 * Created by Dlimbu on 7/1/16.
 */
define (function (require, exports, module) {

   var falcorModelAdapter = require('falcorModelAdapter');
   var Falcor = require('falcor');

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

   var falcorModelTester  = {

      fA : null,

      init: function () {
         this.fA = new falcorModelAdapter.FalcorModelAdapter();
      },

      /**
       * Make Action carousel requests.
       */
      testAction: function () {

         if (!this.fA) {
           this.init();
         }


         /**
          * Retrieve action carousel data with 3 item.
          * with all attributes defined in the data set
          * for each boxArts.
          *
          * HTTP request
          */
         var odPathArray = ["ondemand", "action",
            {
               from: 0,
               to: 2
            },["title", "tmsId","durationMs","imageUrl"]];
         this.fA.varArgsOdReq(odPathArray);

         /**
          * Retrieve action carousel data with 3 item.
          * with just titles.
          *
          * No HTTP request i.e. data from cache.
          */
         var odPathArray = ["ondemand", "action",
            {
               from: 0,
               to: 2
            },"title"];
         this.fA.varArgsOdReq(odPathArray);

         /**
          * Retrieve action carousel
          * 0th item is a common copy within the unified.
          * No HTTP request i.e. data from cache.
          */
         var atIndex = 0;
         odPathArray = ["ondemand", "action", atIndex , ["title", "imageUrl"]];
         this.fA.varArgsOdReq(odPathArray);

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
         this.fA.varArgsOdReq(odPathArray);
      },

      /**
       * Make comedy carousels requests
       */
      testComedy: function () {

         if (!this.fA) {
            this.init();
         }

         /**
          * Paginated request
          * Retrieve comedy carousel data with 2 items.
          * with just 3 attributes
          *
          * HTTP request
          */
         var odPathArray = ["ondemand", "comedy",
            {
               from: 0,
               to: 2
            },
            ["title", "durationMs", "imageUrl"]];
         this.fA.varArgsOdReq(odPathArray);

         /**
          * Make the same 0..2 data requests for Comedy
          * just with tmsId.
          * Http Request
          */
         odPathArray = ["ondemand", "comedy",
            {
               from: 0,
               to: 2
            },
            ["tmsId"]];
         this.fA.varArgsOdReq(odPathArray);

         /**
          * Make the same 0..2 data requests for Comedy
          * but with additional attributes.
          *
          * Past Request: ["title", "durationMs", "imageUrl"] for 0-2
          * Post condition: all data fetched and in cache.
          *
          * Past Request: ["tmsId"] for 0-2
          * Post condition: all data reFetched and store in cache.
          *
          * Past Request: ["title", "durationMs", "imageUrl", "tmsId"] for 0-2
          * Post condition: all data reFetched again and store in cache.
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
               to: 2
            },
            ["title", "durationMs", "imageUrl", "tmsId"]];
         this.fA.varArgsOdReq(odPathArray);

         //Make mixed attribute request.
         //Served from cache.
         odPathArray = ["ondemand", "comedy",
            {
               from: 0,
               to: 2
            },
            ["title", "imageUrl", "tmsId"]];
         this.fA.varArgsOdReq(odPathArray);

         //Make mixed attribute request, with one more carousel.
         //served from cache.
         odPathArray = ["ondemand", "comedy",
            2,
            ["title", "imageUrl", "tmsId"]];
         this.fA.varArgsOdReq(odPathArray);

         //Make next page request.
         odPathArray = ["ondemand", "comedy",
            {
               from: 3,
               to: 6
            },
            ["title", "imageUrl", "tmsId"]];
         this.fA.varArgsOdReq(odPathArray);
      },

      /**
       * Test dedup i.e. property reuse.
       */
      testLocalDedup : function () {
         var $ref = Falcor.Model.ref;
         var actionMovieList = [
//            $ref('titlesById[9292]'),
            { $type: "ref", value: ["titlesById", 9292] },
            {
               tmsId: 234234,
               title: "Death Squad",
               durationMs: 90000,
               imageUrl: "http//imageServer.com/1213",
               isMovie: true,
               seasons: 7,
               episode: 10
            },
            {
               tmsId: 2234,
               title: "22 Jump Street",
               durationMs: 90000,
               imageUrl: "http//imageServer.com/1244",
               wildling: "I am wildling"
            },
            {
               tmsId: 123,
               title: "3 days to Kill",
               durationMs: 90000,
               imageUrl: "http//imageServer.com/1255"
            },
            {
               tmsId: 567,
               title: "47 Ronin",
               durationMs: 700080,
               imageUrl: "http//imageServer.com/99"
            },
            {
               tmsId: 865,
               title: "Ali",
               durationMs: 70000,
               imageUrl: "http//imageServer.com/9999"
            }
         ];

         var onDemand =  {

            //Common reusable data
            titlesById: {
               9292: {
                  "tmsId": 234,
                  "title": "10 cent pistol",
                  "durationMs": 90000,
                  "imageUrl": "http//imageServer.com/9292"
               },
               9293: {
                  "tmsId": 345,
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
               }
            ]
         };

         var model = new Falcor.Model ({
            cache : onDemand
         });

         console.log("cache: ", model.getCache());
         var self = this;
         model.get('genreList[0].titles[0]["title", "durationMs", "imageUrl"]').then(function (x) {
            var input = JSON.stringify(x, null, "  ");
            self.fA.addToScreen("Local Model Dedup test:\nResponse: " + input);
         })
      },

      /**
       * Multi level requests.
       */
      testMultiLevelReq: function () {

         if (!this.fA) {
            this.init();
         }

         var odPathString0 = "ondemand['title','size']";
         var odPathString1 = "ondemand.genreList[0..3].['name','size']";
         var odPathString2 = "ondemand.genreList[0..3].titles[0..2]['tmsId','title']";

         var odPathArray1 = ["ondemand", "genreList", {from: 0, to: 3}, ["name", "size"]];
         var odPathArray2 =
            [
               "ondemand", "genreList", {from: 0, to: 3},
               "titles", {from: 0, to: 2},
               ["tmsId", "title","durationMs","imageUrl"]
            ];

         window.pathArrayMerged = [odPathArray1, odPathArray2];
         console.log("Merged: ", JSON.stringify(pathArrayMerged, null, "  "));

         this.fA.varArgsOdReq(odPathString0, odPathString1, odPathString2);

         //Remote model dedup test.
         var titleAt = 0; //action title index.
         var odPathArray = "ondemand.genreList[0].titles[0]['title', 'durationMs', 'imageUrl']";
         this.fA.varArgsOdReq(odPathArray);
      },

      test: function () {

         if (!this.fA) {
            this.init();
         }

         this.testAction();
         this.testComedy();
         this.testMultiLevelReq();
         this.testLocalDedup();
      }
   };

   exports.tester = falcorModelTester;
});