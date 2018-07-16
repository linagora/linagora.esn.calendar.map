'use strict';

module.exports = function(dependencies, lib, router) {
  const authorizationMW = dependencies('authorizationMW');

  //ADD ROUTES

  router.get('/routes', authorizationMW.requiresAPILogin, () => {console.log('yolo');});

  return router;
};
