import request from 'request';
import config from 'config';
import HttpStatus from 'http-status';
import Planeta from '../model/planeta';
import redis from 'redis';

const client = redis.createClient({
    //reconnecting with built in error
    retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
    }
});

const todayEnd = parseInt(new Date().setHours(23, 59, 59, 999)/1000);

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,
    statusCode,
});
  
const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
    error: message,
}, statusCode);

const calculatoMovies = (planeta) => {
    
    client.get(`${planeta.nome}`, function (err, reply) {
        if (reply) {
            console.log(`redis:${planeta.nome} = ${reply}`);
        } else {
            request(`${config.URL_SWAPI}?search=${planeta.nome}`, { json: true }, (err, response, json) => {
                if (err) throw err;

                planeta.filmes = json.results[0].films.length;

                client.set(`${planeta.nome}`,  planeta.filmes);
                client.expire(`${planeta.nome}`, todayEnd);
            });
        }
    });

    return {planeta, filme:2};
};

class PlanetasController {
    
    add(data) {
        return Planeta.create(data)
        .then((planeta) => defaultResponse(calculatoMovies(planeta), HttpStatus.CREATED))
        .catch((err) => errorResponse(err, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    planetas() {
        return Planeta.find({})
        .then((planetas) => {
            var list = [];

            planetas.forEach(data => {
                list.push(calculatoMovies(data));
            });

            return defaultResponse(list);
        })
        .catch((err) => errorResponse(err));
    }

    findByName(nome) {
        return Planeta.findOne({ nome: nome })
        .then((planeta) => defaultResponse(calculatoMovies(planeta)))        
        .catch((err) => errorResponse(err));
    }

    findById(_id) {
        return Planeta.findOne({_id: _id})
        .then(planeta => defaultResponse(calculatoMovies(planeta)))
        .catch((err) => errorResponse(err));
    }

    remove(_id) {
        return Planeta.deleteOne({_id: _id})
        .then((data) => {
            if(data.n > 0){
                return defaultResponse({message:'Excluido com sucesso.'});
            } else {
                return defaultResponse({message:'Registro não encontrado.'});
            }
        })
        .catch((err) => errorResponse(err));
    }
}

export default PlanetasController;