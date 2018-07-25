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
    
    add(data) {
        return Planeta.create(data)
        .then((planeta) => defaultResponse(planeta, HttpStatus.CREATED))
        .catch((err) => errorResponse(err, HttpStatus.UNPROCESSABLE_ENTITY));
    };

    planetas() {
        return Planeta.find({})
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };

    findByName(nome) {
        return Planeta.find({ nome: nome })
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };

    /**
     * @api {get} api/planetas/:id Buscar por ID
     */
    findById(_id) {
        return Planeta.findOne({_id: _id})
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };

    /**
     * @api {delete} api/planetas/:id Deletar por ID
     */
    remove(_id) {
        return Planeta.deleteOne({_id: _id})
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };
}

export default PlanetasController;