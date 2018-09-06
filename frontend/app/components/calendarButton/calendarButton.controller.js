(function(angular) {
  'use strict';

  angular.module('linagora.esn.calendar.map')
    .controller('calendarButtonController', calendarButtonController);

  function calendarButtonController(
    $window
  ) {
    var self = this;
    var L = $window.L;

    self.$onInit = $onInit;

    function $onInit() {
      _injectBox();
    }

    function _injectBox() {
      var returnToCalendarButton = L.control({
        position: 'bottomleft'
      });

      returnToCalendarButton.onAdd = function() {
        this.div = L.DomUtil.get('returnToCalendarButton');

        if (!L.Browser.touch) {
          L.DomEvent.disableClickPropagation(this.div);
          L.DomEvent.on(this.div, 'mousewheel', L.DomEvent.stopPropagation);
        } else {
          L.DomEvent.on(this.div, 'click', L.DomEvent.stopPropagation);
        }

        return this.div;
      };

      self.controls.custom.push(returnToCalendarButton);
    }
  }
})(angular);
