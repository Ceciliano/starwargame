import express from 'express';
import { add, planetas, findByName, findById, remove } from '../service/planetaService';

export default (server) => {
  const router = express.Router();
  server.use('/api', router);

  router.route('/planetas').post(add);
  router.route('/planetas').get(planetas);
  router.route('/planetas/findByName/:nome').get(findByName);
  router.route('/planetas/:_id').get(findById);
  router.route('/planetas/:_id').delete(remove);
}
