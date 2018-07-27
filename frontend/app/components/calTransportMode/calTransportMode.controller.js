(function() {
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

        return this.div;
      };

      self.controls.custom.push(transportMode);

      self.transportmode = 'car';
    }
  }
})();
