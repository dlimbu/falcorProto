/**
 * Created by Dlimbu on 6/28/16.
 */

define(function (require, exports, module) {

   var Falcor = require('falcor');
   var view = document.getElementById("view");
   var serverPath = "http://localhost:8080";

   var FalcorTest = function () {
      this.createModel();

   };

   FalcorTest.prototype.createModel = function () {
      this.model = new Falcor.Model({
         source: new Falcor.HttpDataSource(serverPath + '/umodel.json')
      });
   };

   var createTextElem = function (text) {
      var pfText = document.createElement("Pre");
      var tn =  document.createTextNode(text);
      pfText.appendChild(tn);
      return pfText;
   };

   FalcorTest.prototype.getOndemand = function (pathArray) {

      this.model.get(pathArray).then(function(resp) {
         pathArray = JSON.stringify(pathArray, null, '  ');
         var respStr = JSON.stringify(resp, null, '  ');
         var input = "Request.Path: "+ pathArray + "\n\n Response: " + respStr;
         view.appendChild(createTextElem(input));
      })
   };

   exports.FalcorTest = FalcorTest;
});



