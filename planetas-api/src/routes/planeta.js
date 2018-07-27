import express from 'express';
import * as planetaControllers from '../controllers/PlanetaControllers';

export default (server) => {
  const router = express.Router();

  server.use('/api', router);

  /**
    * @api {get} api/planetas Lista Planetas
    * @api {post} api/planetas Adicionar um planeta
    * @apiExample Example usage:
    *     endpoint: http://localhost:3000/api/planetas
    *     body:
    *     {
    *       "nome": "Naboo",
    *       "clima": "Frio",
    *       "terreno": "Árido"
    *     }
  */ 
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

  /**
    * @api {get} api/planetas/findByName/:nome Buscar por nome
  */
  router.route('/planetas/findByName/:nome').get((req, res) => {
    planetaControllers.findByName(req.params.nome)
      .then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  /**
    * @api {get} api/planetas/:id Buscar por ID
    * @api {delete} api/planetas/:id Deletar por ID
  */
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
