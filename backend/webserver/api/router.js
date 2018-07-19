'use strict';

module.exports = (dependencies, lib, router) => {
  const authorizationMW = dependencies('authorizationMW');
  const { routes } = require('../controllers')(dependencies, lib);

  //ADD ROUTES

  router.get('/routes/:transportMode/:start/:destination', authorizationMW.requiresAPILogin, routes.getRoutes);

  router.get('/search/:address', authorizationMW.requiresAPILogin, routes.getCoordFromAddress);

  router.get('/reverse/:latitude/:longitude', authorizationMW.requiresAPILogin, routes.getAddressFromCoord);

  return router;
};
