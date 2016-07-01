/**
 * Created by Dlimbu on 6/28/16.
 */

requirejs.config({
   baseUrl: 'lib',
   paths: {
      "app": "../app",
      "falcor" : "falcor.browser",
      "falcorModelAdapter": "../app/falcorModelAdapter"
   }
});

requirejs(['app/falcorModelTest'], function (falcorModelTest) {
   falcorModelTest.tester.test();
});

