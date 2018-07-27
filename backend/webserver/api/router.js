'use strict';

module.exports = (dependencies, lib, router) => {
  const authorizationMW = dependencies('authorizationMW');
  const { routes } = require('../controllers')(dependencies, lib);

  //ADD ROUTES

  router.get('/routes/:transportMode/:start_lat/:start_long/:destination_lat/:destination_long', authorizationMW.requiresAPILogin, routes.getRoutes);

  router.get('/search/:address', authorizationMW.requiresAPILogin, routes.getCoordFromAddress);

  router.get('/reverse/:latitude/:longitude', authorizationMW.requiresAPILogin, routes.getAddressFromCoord);

  return router;
};
