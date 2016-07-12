/**
 * Created by Dlimbu on 6/28/16.
 */

define(function (require, exports, module) {
   'use strict';
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
      var self = this;
      this.model.get.apply(this.model, arguments).then(function(resp) {
         varAargs = JSON.stringify(args, null, '  ');
         var respStr = JSON.stringify(resp, null, '  ');
         var input = "Request.Path: "+ varAargs + "\n\nResponse: " + respStr;
         self.addToScreen(input);
      })
   };

   FalcorModelAdapter.prototype.addToScreen = function (str) {
      var txt = createTextElem(str);
      view.appendChild(txt);
   };

   var bitDabbler = function (i) {

      var BINARY = 2;
      var HEX    = 16;
      var BYTE   = 8;
      var WORD   = 2 * BYTE;

      var readByte = function (binary, shift) {
         return (binary >> shift) & 0xFF;
      };

      //byte factor
      var pad = function (binary) {
         var pad = BYTE - (binary.length % BYTE);
         var _out = "";
         for (var i = 0; i < pad; i++) {
            _out += "0";
         }
         _out += binary;
         return _out;
      };

      var binary = i.toString(BINARY);
      binary = pad(binary);

      var hex = i.toString(HEX);
      console.log(" " + binary + " " + hex);
   };

   exports.FalcorModelAdapter = FalcorModelAdapter;
});



