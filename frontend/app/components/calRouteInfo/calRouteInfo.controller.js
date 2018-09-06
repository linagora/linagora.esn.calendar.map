(function(angular) {
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
        var routeInfoBox = L.control({position: 'topright'});

        routeInfoBox.onAdd = function() {
          this.div = L.DomUtil.get('routeInfoBox');

          if (!L.Browser.touch) {
            L.DomEvent.disableClickPropagation(this.div);
            L.DomEvent.on(this.div, 'mousewheel', L.DomEvent.stopPropagation);
          } else {
            L.DomEvent.on(this.div, 'click', L.DomEvent.stopPropagation);
          }

          return this.div;
        };

        var showHidebutton = L.control({position: 'topright'});

        showHidebutton.onAdd = function() {
          this.div = L.DomUtil.get('showHidebutton');

          if (!L.Browser.touch) {
            L.DomEvent.disableClickPropagation(this.div);
            L.DomEvent.on(this.div, 'mousewheel', L.DomEvent.stopPropagation);
          } else {
            L.DomEvent.on(this.div, 'click', L.DomEvent.stopPropagation);
          }

          return this.div;
        };

        self.controls.custom.push(routeInfoBox, showHidebutton);
      }

      self.isVisible = false;

      self.showHideInfoBox = function() {
        self.isVisible = !self.isVisible;
      };

      self.iconClass = function(iconInitial) {
        var iconClass;

        switch (iconInitial) {
          case 'Dep':
            iconClass = 'mdi mdi-map-marker depIcon';
            break;
          case 'Arr':
            iconClass = 'mdi mdi-map-marker arrIcon';
            break;
          case 'Rd':
            iconClass = 'mdi mdi-reload mdi-flip-h';
            break;
          case 'C':
          case 'S':
            iconClass = 'mdi mdi-arrow-up';
            break;
          case 'R':
          case 'SlR':
          case 'ShR':
            iconClass = 'mdi mdi-subdirectory-arrow-right mdi-flip-v';
            break;
          case 'L':
          case 'SlL':
          case 'ShL':
            iconClass = 'mdi mdi-subdirectory-arrow-left mdi-flip-v';
            break;
          case 'Ut':
            iconClass = 'mdi mdi-undo-variant mdi-rotate-270';
            break;
          case 'MR':
            iconClass = 'mdi mdi-call-merge';
            break;
          case 'ML':
            iconClass = 'mdi mdi-call-merge mdi-flip-h';
            break;
          case 'FL':
            iconClass = 'mdi mdi-directions-fork';
            break;
          case 'FR':
            iconClass = 'mdi mdi-directions-fork mdi-flip-h';
            break;
        }

        return iconClass;
      };
    }
  })(angular);
