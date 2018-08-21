(function() {
  'use strict';

  angular.module('linagora.esn.calendar.map')
    .controller('calinfoBoxController', calinfoBoxController);

  function calinfoBoxController(
    $scope,
    $window,
    calendarGeoApi,
    calendarMapRestangular,
    mapUtils
  ) {
    var self = this;
    var L = $window.L;

    self.$onInit = $onInit;

    $scope.$watch('ctrl.routes', function(newVal) {
      if (!newVal) {
        return;
      }

      self.duration = mapUtils.displayTime(newVal.routes[0].all_duration);
      self.distance = mapUtils.displayDistance(newVal.routes[0].all_distance);
    });

    function $onInit() {
      _injectBox();
    }

    function _injectBox() {
      var infoBox = L.control({
        position: 'topright'
      });

      infoBox.onAdd = function() {
        this.div = L.DomUtil.get('infoBox');

        if (!L.Browser.touch) {
          L.DomEvent.disableClickPropagation(this.div);
          L.DomEvent.on(this.div, 'mousewheel', L.DomEvent.stopPropagation);
        } else {
          L.DomEvent.on(this.div, 'click', L.DomEvent.stopPropagation);
        }

        return this.div;
      };

      self.controls.custom.push(infoBox);
    }
  }
})();
