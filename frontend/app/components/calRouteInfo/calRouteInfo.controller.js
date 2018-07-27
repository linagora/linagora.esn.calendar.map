(function() {
    'use strict';

    angular.module('linagora.esn.calendar.map')
      .controller('calRouteInfoController', calRouteInfoController);

    function calRouteInfoController(
      $window
    ) {
      var self = this;
      var L = $window.L;

      self.$onInit = $onInit;

      function $onInit() {
        _injectBox();
      }

      function _injectBox() {
        var routeInfoBox = L.control({
          position: 'topright'
          // autoZIndex: true,
          // collapsed: true
        });

        var btn = L.control({position: 'topright'});

        routeInfoBox.onAdd = function() {
          this.div = L.DomUtil.get('routeInfoBox');

          return this.div;
        };

        btn.onAdd = function() {
          this.div = L.DomUtil.get('btn');

          return this.div;
        };

        self.controls.custom.push(routeInfoBox, btn);
      }

      self.IsVisible = false;

      self.ShowHide = function() {
        self.IsVisible = !self.IsVisible;
      };
    }
  })();
