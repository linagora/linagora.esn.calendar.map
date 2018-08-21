(function() {
  'use strict';

  angular.module('linagora.esn.calendar.map')
    .controller('calReturnButtonController', calReturnButtonController);

  function calReturnButtonController(
    $window
  ) {
    var self = this;
    var L = $window.L;

    self.$onInit = $onInit;
    self.returnToPos = returnToPos;

    function $onInit() {
      self.markersCenter = self.centers;
      _injectButton();
    }

    function _injectButton() {
      var returnBtn = L.control({
        position: 'bottomleft'
      });

      returnBtn.onAdd = function() {
        this.div = L.DomUtil.get('returnButton');

        if (!L.Browser.touch) {
          L.DomEvent.disableClickPropagation(this.div);
          L.DomEvent.on(this.div, 'mousewheel', L.DomEvent.stopPropagation);
        } else {
          L.DomEvent.on(this.div, 'click', L.DomEvent.stopPropagation);
        }

        return this.div;
      };

      self.controls.custom.push(returnBtn);
    }

    function returnToPos() {
        self.backToMarker();
    }
  }
})();
