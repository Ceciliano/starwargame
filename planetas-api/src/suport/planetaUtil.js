import config from 'config';
import redis from 'redis';
import request from 'request';
import HttpStatus from 'http-status';

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

export const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,
    statusCode,
});
  
export const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
    error: message,
}, statusCode);

export function calculatoMovies(planeta){
    let filmes = 0;

    client.get(`${planeta.nome}`, function (err, reply) {
        if (reply) {
            console.log(`redis:${planeta.nome} = ${reply}`);
        } else {
            request(`${config.URL_SWAPI}?search=${planeta.nome}`, { json: true }, (err, response, json) => {
                if (err) throw err;

                filmes = json.results[0].films.length;

                client.set(`${planeta.nome}`, filmes);
                client.expire(`${planeta.nome}`, todayEnd);
            });
        }
    });

    let data = JSON.parse(JSON.stringify(planeta));
    data.filmes = filmes;
    
    return data;
};