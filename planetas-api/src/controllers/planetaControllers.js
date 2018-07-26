import HttpStatus from 'http-status';
import Planeta from '../model/planeta';
import {defaultResponse, errorResponse, calculatoMovies} from '../suport/planetaUtil';

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