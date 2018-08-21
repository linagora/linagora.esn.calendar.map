'use strict';

module.exports = dependencies => {
  const axios = require('axios');
  const { URL } = require('url');
  const { DEFAULT_API_URL } = require('./constants');
  const esnConfig = dependencies('esn-config');
  const logger = dependencies('logger');

  return {
    getRoutes,
    getCoordFromAddress,
    getAddressFromCoord
  };

  function getRoutes({ transportMode, start_lat, start_long, destination_lat, destination_long }, user, callback) {
    esnConfig('api').inModule('linagora.esn.calendar.map').forUser(user).get().then(urlApi => {
      if (!urlApi) {
        logger.debug(`Calendar map api configuration not found, default config used: ${DEFAULT_API_URL}`);
      }

      const url = new URL(`/nearest/coordinates/${transportMode}/${start_lat}/${start_long}/${destination_lat}/${destination_long}`, urlApi || DEFAULT_API_URL);

      logger.debug(`Request map api: ${url.href}`);

      return axios.get(url.href)
      .then(response => callback(null, response.data))
      .catch(err => callback(err, null));
    });
  }

  function getCoordFromAddress({ address }, callback) {
    const getCoordUrl = new URL(`http://nominatim.openstreetmap.org/search/${address}?format=json&namedetails=0&addressdetails=0&limit=1`);

    logger.debug(`Request nominatim api: ${getCoordUrl.href}`);

    return axios.get(getCoordUrl.href)
    .then(response => callback(null, response.data[0]))
    .catch(err => callback(err, null));
  }

  function getAddressFromCoord({ latitude, longitude }, callback) {
    const getAddressUrl = new URL(`http://nominatim.openstreetmap.org/reverse?addressdetails=1&format=json&lat=${latitude}&lon=${longitude}`);

    logger.debug(`Request nominatim api: ${getAddressUrl.href}`);

    return axios.get(getAddressUrl.href)
    .then(response => callback(null, response.data.display_name))
    .catch(err => callback(err, null));
  }
};
