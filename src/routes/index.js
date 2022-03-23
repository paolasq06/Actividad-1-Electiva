const express = require('express');
const person_route = require('./persons.routes');

/* Router() permite acceder a: POST, PUT, DELETE, GET, GET{:id} */
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/persons', person_route);
}

module.exports = routerApi;
