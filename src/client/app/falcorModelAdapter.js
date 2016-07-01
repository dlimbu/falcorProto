/**
 * Created by Dlimbu on 6/28/16.
 */

define(function (require, exports, module) {

   var Falcor = require('falcor');

   var view = document.getElementById("view");
   var serverPath = "http://localhost:8080";

   var FalcorModelAdapter = function () {
      this.createModel();
   };

   FalcorModelAdapter.prototype.createModel = function () {
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

   FalcorModelAdapter.prototype.varArgsOdReq = function (varAargs) {
      var args = arguments;
      this.model.get.apply(this.model, arguments).then(function(resp) {
         varAargs = JSON.stringify(args, null, '  ');
         var respStr = JSON.stringify(resp, null, '  ');
         var input = "Request.Path: "+ varAargs + "\n\n Response: " + respStr;
         view.appendChild(createTextElem(input));
      })
   };

   exports.FalcorModelAdapter = FalcorModelAdapter;
});



