# STARWARGAME

Desenvolvido para o desafio de uma vaga, consiste em 1 microsserviços Docker para um jogo com algumas informações da franquia StarWar. Foi criado utilizando NodeJs com framework Express, ES6, MongoDb, Redis e orquestrados via Docker Compose.

## Sobre a api

A **planetas-api** recebe dados dos planetas manualmente grava no banco Mongo e depois calcula a quantidade de aparições em filmes obtidas pela API pública do Star Wars:  https://swapi.co/ 

## Pré-requisitos

O que você precisa para instalar o software e instalá-lo


Execução com docker-compose up
```
-Docker - https://www.docker.com/
```
Para rodar local 
```
-Nodejs - https://nodejs.org/en/
-Redis - https://redis.io/
-Mongo - https://www.mongodb.com/download-center#enterprise
```
## Instalação
Após clone, executar o comando:

```sh
$ cd starwargame
```
O Docker vai baixar todas as dependências, realizar build dos pacotes, e subir todos os containers com a aplicação:
```sh
$ sudo docker-compose up -d
```
Para rodar local:
```sh
$ sudo mongod
$ sudo redis-server
$ sudo npm i
$ sudo npm start
```
## Testes

```
Give an example
```

## Construído com

* Nodejs
* Redis - Para guardar cache das quantidades dos filmes.
* Mongo
* Express
* Mongose
* Babel
* ES6
* Config - Para diferenciar ambientes
* Request - Para Consumir serviços
* Ioredis - Para orquestrar o Redis - https://github.com/luin/ioredis

## Autor

* **Rafael Braga** - *Desafio* - [Ceciliano](https://github.com/Ceciliano)

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter detalhes

## Agradecimentos

* My Wife
