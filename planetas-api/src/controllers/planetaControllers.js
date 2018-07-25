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

/**
 * @api {post} api/planetas Adicionar um planeta
 * @apiGroup Planetas
 * @apiExample Example usage:
 *     endpoint: http://localhost:3000/api/planetas
 *
 *     body:
 *     {
 *       "nome": "Naboo",
 *       "clima": "Frio",
 *       "terreno": "Árido"
 *     }
 * @apiParam {String} nome Nome do planeta (Campo obrigatório).
 * @apiParam {String} clima Clima do planeta.
 * @apiParam {String} terreno Terreno do planeta. 
 *
 * @apiSuccess {Date} createAt Data de criação.
 * @apiSuccess {String} _id ID do planeta.
 * @apiSuccess {String} nome Nome do planeta.
 * @apiSuccess {String} clima Clima do planeta.
 * @apiSuccess {String} terreno Terreno do planeta.
 * @apiSuccess {Number} filmes Quantidades de aparições em filmes.
 * @apiSuccess {Number} __v Versão do objeto. 
 * 
 * @apiSuccessExample {json} Sucesso
 *    JSON 200 OK
 *      {
            "createAt": ...,
            "_id": ...,
            "nome": ...,
            "clima": ...,
            "terreno": ...,
            "filmes": ...,
            "__v": ...
 *      }
 */
    add(data) {
        Planeta.create(data)
        .then((planeta) => defaultResponse(planeta, HttpStatus.CREATED))
        .catch((err) => errorResponse(err, HttpStatus.UNPROCESSABLE_ENTITY));
    };

/**
 * @api {get} api/planetas Lista Planetas
 * @apiGroup Planetas
 *
 * @apiSuccess {Date} createAt Data de criação.
 * @apiSuccess {String} _id ID do planeta.
 * @apiSuccess {String} nome Nome do planeta.
 * @apiSuccess {String} clima Clima do planeta.
 * @apiSuccess {String} terreno Terreno do planeta.
 * @apiSuccess {Number} filmes Quantidades de aparições em filmes.
 * @apiSuccess {Number} __v Versão do objeto. 
 * 
 * @apiSuccessExample {json} Sucesso
 *    JSON 200 OK
 *    [
        {
            "createAt": "2018-05-01T00:08:32.527Z",
            "_id": "5ae7b000b5cef138783b4262",
            "nome": "Yavin IV",
            "clima": "quente",
            "terreno": "rochoso",
            "filmes": 1,
            "__v": 0
        },
        {
            "createAt": "2018-05-01T03:33:47.229Z",
            "_id": "5ae7e01bf941401f08365fbf",
            "nome": "Alderaan",
            "clima": "frio",
            "terreno": "arido",
            "filmes": 2,
            "__v": 0
        },
        ...        
      ]
 *
 */
    planetas() {
        Planeta.find({})
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };

/**
 * @api {get} api/planetas/findByName/:nome Buscar por nome
 * @apiGroup Planetas
 *
 * @apiSuccess {Date} createAt Data de criação.
 * @apiSuccess {String} _id ID do planeta.
 * @apiSuccess {String} nome Nome do planeta.
 * @apiSuccess {String} clima Clima do planeta.
 * @apiSuccess {String} terreno Terreno do planeta.
 * @apiSuccess {Number} filmes Quantidades de aparições em filmes.
 * @apiSuccess {Number} __v Versão do objeto. 
 * 
 * @apiSuccessExample {json} Sucesso
 *    JSON 200 OK
 *    [
 *      {
            "createAt": "2018-05-01T03:33:47.229Z",
            "_id": "5ae7e01bf941401f08365fbf",
            "nome": "Alderaan",
            "clima": "frio",
            "terreno": "arido",
            "filmes": 2,
            "__v": 0
 *      }
 *    ]
 *
 */
    findByName(nome) {
        Planeta.find({ nome: nome })
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };

/**
 * @api {get} api/planetas/:id Buscar por ID
 * @apiGroup Planetas
 *
 * @apiSuccess {Date} createAt Data de criação.
 * @apiSuccess {String} _id ID do planeta.
 * @apiSuccess {String} nome Nome do planeta.
 * @apiSuccess {String} clima Clima do planeta.
 * @apiSuccess {String} terreno Terreno do planeta.
 * @apiSuccess {Number} filmes Quantidades de aparições em filmes.
 * @apiSuccess {Number} __v Versão do objeto. 
 * 
 * @apiSuccessExample {json} Sucesso
 *    JSON 200 OK
 *      {
            "createAt": "2018-05-01T03:33:47.229Z",
            "_id": "5ae7e01bf941401f08365fbf",
            "nome": "Alderaan",
            "clima": "frio",
            "terreno": "arido",
            "filmes": 2,
            "__v": 0
 *      }
 */
    findById(_id) {
        Planeta.findOne({_id: _id})
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };

/**
 * @api {delete} api/planetas/:id Deletar por ID
 * @apiGroup Planetas
 *
 * @apiSuccess {Number} n Quantidades de registros deletados.
 * @apiSuccess {Number} __v Versão do objeto. 
 * 
 * @apiSuccessExample {json} Sucesso
 *    JSON 200 OK
 *    [
        {
            "n": 1,
            "ok": 1
        }
 *    ]
 *
 */
    remove(_id) {
        Planeta.deleteOne({_id: _id})
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err));
    };
}
