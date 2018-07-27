(function() {
  'use strict';

  var MODULE_NAME = 'linagora.esn.calendar.map';

  angular.module(MODULE_NAME)
    .constant('DEFAULT_TILES', {
      url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      type: 'xyz',
      options: {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        accessToken: 'pk.eyJ1IjoiYWltYW5yayIsImEiOiJjamYweXNmMmQwNmp2Mndva2k1ZnZ2Nm9sIn0._EyYBF5kvrYSsiqOGdLLJw',
        id: 'mapbox.streets'
      }
    })
    .constant('DEFAULT_TRANSPORT_TYPE', 'car')
    .constant('DEFAULT_CENTER', {
      lat: 47.909009,
      lng: 2.334976,
      zoom: 5,
      autoDiscover: false
    })
    .constant('DEFAULT_DURATION', '_ h _ min')
    .constant('DEFAULT_DISTANCE', '_ Km');
})();
