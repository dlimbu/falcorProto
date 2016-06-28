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
   fT.sendReq();
});

