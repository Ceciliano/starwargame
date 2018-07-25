const express = require('express')

module.exports = function(server){
  const router = express.Router()
  server.use('/api', router)

  const planetaService = require('../service/planetaService');

  router.route('/planetas').post(planetaService.add)
  router.route('/planetas').get(planetaService.planetas)
  router.route('/planetas/findByName/:nome').get(planetaService.findByName)
  router.route('/planetas/:_id').get(planetaService.findById)
  router.route('/planetas/:_id').delete(planetaService.remove)
}
