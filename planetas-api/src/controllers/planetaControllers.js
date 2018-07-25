import request from 'request';
import config from 'config';
import HttpStatus from 'http-status';
import Planeta from '../model/planeta';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,
    statusCode,
  });
  
const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
    error: message,
}, statusCode);

class PlanetasController {
    constructor() {
    };

    /**
     * @api {post} api/planetas Adicionar um planeta
     * @apiExample Example usage:
     *     endpoint: http://localhost:3000/api/planetas
     *
     *     body:
     *     {
     *       "nome": "Naboo",
     *       "clima": "Frio",
     *       "terreno": "Árido"
     *     }
    */
    add(data) {
        Planeta.create(data)
        .then((planeta) => defaultResponse(planeta, HttpStatus.CREATED))
        .catch((err) => errorResponse(err, HttpStatus.UNPROCESSABLE_ENTITY));
    };

    /**
     * @api {get} api/planetas Lista Planetas
    */
    planetas() {
        Planeta.find({})
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };

    /**
     * @api {get} api/planetas/findByName/:nome Buscar por nome
     */
    findByName(nome) {
        Planeta.find({ nome: nome })
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };

    /**
     * @api {get} api/planetas/:id Buscar por ID
     */
    findById(_id) {
        Planeta.findOne({_id: _id})
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };

    /**
     * @api {delete} api/planetas/:id Deletar por ID
     */
    remove(_id) {
        Planeta.deleteOne({_id: _id})
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };
}

export default PlanetasController;