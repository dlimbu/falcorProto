/**
 * Created by Dlimbu on 6/28/16.
 */

requirejs.config({
   baseUrl: 'lib',
   paths: {
      "app": "../app",
      "falcor": "https://netflix.github.io/falcor/build/falcor.browser"
   }
});

requirejs(['app/falcorClient'], function (falcorClient) {
   var fT = new falcorClient.FalcorTest();

   /**
    * All the requests returns the whole data set
    * instead of the subset request based on our targeted
    * request.
    */

   // (from, to, value);
   fT.getOndemand(0, 2, "title");
   fT.getOndemand(0, 4, "title");
   fT.getOndemand(1, 4, "title");

   /**
    * tmsId makes a seperate request even though the
    * data is cache.
    */
   fT.getOndemand(1, 3, "tmsId");
});

