(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME)
    .run(injectCalendarMap)
    .run(registerModuleConfiguration);

  function injectCalendarMap(dynamicDirectiveService) {
    var map = new dynamicDirectiveService.DynamicDirective(true, 'cal-event-form-map', {attributes: [{name: 'event-location', value: 'editedEvent.location'}]});

    dynamicDirectiveService.addInjection('calendar-map', map);
  }

  function registerModuleConfiguration(esnModuleRegistry, CALENDAR_MAP_MODULE_METADATA) {
    esnModuleRegistry.add(CALENDAR_MAP_MODULE_METADATA);
  }

})(angular);
