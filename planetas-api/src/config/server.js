import bodyParser from 'body-parser';
import express from 'express';
import config from 'config';

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(config.PORT, function() {
    console.log(`BACKEND is running on port ${config.PORT}.` );
});

export default server;
