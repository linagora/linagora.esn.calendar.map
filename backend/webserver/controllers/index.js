'use strict';

module.exports = (dependencies, lib) => {
    const routes = require('./routes')(dependencies, lib);

    return {
        routes
    };
};
