(function(angular) {
  'use strict';

  angular.module('linagora.esn.calendar.map')
    .controller('calTransportModeFormController', calTransportModeFormController);

  function calTransportModeFormController(
    $window
  ) {
    var L = $window.L;
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      _injectForm();
    }

    function _injectForm() {
      var transportMode = L.control({
        position: 'bottomleft'
      });

      transportMode.onAdd = function() {
        this.div = L.DomUtil.get('transportModeBox');

        if (!L.Browser.touch) {
          L.DomEvent.disableClickPropagation(this.div);
          L.DomEvent.on(this.div, 'mousewheel', L.DomEvent.stopPropagation);
        } else {
          L.DomEvent.on(this.div, 'click', L.DomEvent.stopPropagation);
        }

        return this.div;
      };

      self.controls.custom.push(transportMode);

      self.transportmode = 'car';
    }
  }
})(angular);
