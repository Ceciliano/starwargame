import HttpStatus from 'http-status';
import Planeta from '../model/planeta';
import {defaultResponse, errorResponse} from '../suport/planetaUtil';
import {calculatoMovies} from '../suport/cache';

class PlanetasController {
    
    add(data) {
        return Planeta.create(data)
        .then((planeta) => calculatoMovies(planeta))
        .then((planeta) => defaultResponse(planeta))
        .catch((err) => errorResponse(err, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    planetas() {
        return Planeta.find({})
        .then((planetas) => {
            let promises = [];

            planetas.forEach(data => {
                promises.push(calculatoMovies(data));
            });

            return new Promise(function (resolve, reject) {
                Promise.all(promises).then(arrList => {
                    resolve(arrList);   
                });
            });
        })
        .then(planetas => defaultResponse(planetas))  
        .catch((err) => errorResponse(err));
    }

    findByName(nome) {
        return Planeta.findOne({ nome: nome })
        .then(planeta => calculatoMovies(planeta))
        .then(planeta => defaultResponse(planeta))       
        .catch((err) => errorResponse(err));
    }

    findById(_id) {
        return Planeta.findOne({_id: _id})
        .then(planeta => calculatoMovies(planeta))
        .then(planeta => defaultResponse(planeta))
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