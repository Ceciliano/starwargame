import config from 'config';
import request from 'request';
import {clone} from './planetaUtil';
import Redis from 'ioredis';

let redis = new Redis(config.URL_REDIS);

const todayEnd = parseInt(new Date().setHours(23, 59, 59, 999)/1000);

export const calculatoMovies = planeta =>{
    planeta = clone(planeta);

    return new Promise(function (resolve, reject) {

        redis.get(`${planeta.nome}`).then( result => {
            if (result) {
                planeta.filmes = result;
                
                resolve(planeta);
            } else {
                request(`${config.URL_SWAPI}?search=${planeta.nome}`, { json: true }, (err, response, json) => {
                    if (err) throw err;

                    if(json.results[0]){
                        planeta.filmes = json.results[0].films.length;
                    } else {
                        planeta.filmes = 0;
                    }
                    redis.set(`${planeta.nome}`, planeta.filmes);
                    redis.expire(`${planeta.nome}`, todayEnd);

                    resolve(planeta);
                });
            }
        });
    })};