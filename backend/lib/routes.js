'use strict';

module.exports = () => {
  const axios = require('axios');
  const { URL } = require('url');

  return {
    getRoutes,
    getCoordFromAddress,
    getAddressFromCoord
  };

  function getRoutes({ transportMode, start, destination }, callback) {
    const getRoutesUrl = new URL(`http://localhost:8090/nearest/${transportMode}/${start}/${destination}`);

    return axios.get(getRoutesUrl.href)
    .then(response => callback(null, response.data))
    .catch(err => callback(err, null));
  }

  function getCoordFromAddress({ address }, callback) {
    const getCoordUrl = new URL(`http://nominatim.openstreetmap.org/search/${address}?format=json&addressdetails`);

    return axios.get(getCoordUrl.href)
    .then(response => callback(null, response.data[0]))
    .catch(err => callback(err, null));
  }

  function getAddressFromCoord({ latitude, longitude }, callback) {
    const getAddressUrl = new URL(`http://nominatim.openstreetmap.org/reverse?addressdetails=1&format=json&lat=${latitude}&lon=${longitude}`);

    return axios.get(getAddressUrl.href)
    .then(response => callback(null, response.data.display_name))
    .catch(err => callback(err, null));
  }
};
