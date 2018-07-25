import express from 'express';
import PlanetaControllers from '../controllers/PlanetaControllers';

export default (server) => {
  const planetaControllers = new PlanetaControllers();
  const router = express.Router();

  server.use('/api', router);

  router.route('/planetas').get((req, res) => {
    planetaControllers.planetas()
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  }).post((req, res) => {
    planetaControllers.add(req.body)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.route('/planetas/findByName/:nome').get((req, res) => {
    planetaControllers.findByName(req.params.nome)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.route('/planetas/:_id').get((req, res) => {
    planetaControllers.findById(req.params._id)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  }).delete((req, res) => {
    planetaControllers.remove(req.params._id)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });
};
