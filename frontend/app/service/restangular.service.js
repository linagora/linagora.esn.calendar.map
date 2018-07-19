(function() {
  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';
  var MODULE_DIR_NAME = '/linagora.esn.calendar.map';

  angular.module(MODULE_NAME)
    .factory('calendarMapRestangular', calendarMapRestangular);

    function calendarMapRestangular(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(MODULE_DIR_NAME + '/api');
        RestangularConfigurer.setFullResponse(true);
        RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/json; charset=UTF-8'});
      });
    }
})();
