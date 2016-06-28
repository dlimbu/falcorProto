/**
 * Created by Dlimbu on 6/28/16.
 */

define(function (require, exports, module) {

   var Falcor = require('falcor');

   var serverPath = "localhost:8080";

   var FalcorTest = function () {
      this.createModel();
   };

   FalcorTest.prototype.createModel = function () {
      this.model = new Falcor.Model({
         source: new Falcor.HttpDataSource(serverPath + '/umodel.json')
      });
   };

   FalcorTest.prototype.sendReq = function () {
      document.write("FalcorClient sending req !!!! ");
      this.model.get("id").then(function (resp) {
         document.write("Falcor server response " + resp);
      });
   };

   exports.FalcorTest = FalcorTest;
});



