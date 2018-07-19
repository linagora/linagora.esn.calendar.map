module.exports = (dependencies, lib) => {

    return {
      getRoutes,
      getCoordFromAddress,
      getAddressFromCoord
    };

    function getRoutes(req, res) {
      if (!req.params.transportMode) {
        return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'Transport mode is missing'}});
      }

      if (!req.params.start) {
        return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'Start address is missing'}});
      }

      if (!req.params.destination) {
        return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'Destination address is missing'}});
      }

      lib.routes.getRoutes(req.params, (err, result) => {
        if (err) {
          return res.status(500).json({error: { code: 500, message: 'Getting routes error', details: err.message }});
        }

        return res.status(200).json(result);
      });
    }

    function getCoordFromAddress(req, res) {
      if (!req.params.address) {
        return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'Address is missing'}});
      }

      lib.routes.getCoordFromAddress(req.params, (err, result) => {
        if (err) {
          return res.status(500).json({error: { code: 500, message: 'Getting coordonate error', details: err.message }});
        }

        return res.status(200).json(result);
      });
    }

    function getAddressFromCoord(req, res) {
      if (!req.params.latitude) {
        return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'Latitude is missing'}});
      }

      if (!req.params.longitude) {
        return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'Longitude is missing'}});
      }

      lib.routes.getAddressFromCoord(req.params, (err, result) => {
        if (err) {
          return res.status(500).json({error: { code: 500, message: 'Getting address error', details: err.message }});
        }

        return res.status(200).json(result);
      });
    }
  };
