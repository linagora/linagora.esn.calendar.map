(function(angular) {
    'use strict';

    var MODULE_NAME = 'linagora.esn.calendar.map';

    angular.module(MODULE_NAME)

    .component('calendarMapConfigForm', {
      templateUrl: '/linagora.esn.calendar.map/app/components/config/calendar-map-config-form.html',
      bindings: {
        configurations: '='
      }
    });

  })(angular);
