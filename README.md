# STARWARGAME

Desenvolvido para o desafio starwargame, este projeto consiste em 1 microsserviço Docker para um jogo com algumas informações da franquia StarWar. Foi criado utilizando NodeJs com framework Express, ES6, MongoDb, Redis e orquestrados via Docker Compose.

## Sobre a api

A **planetas-api** recebe dados dos planetas manualmente, grava no banco Mongo e depois calcula a quantidade de aparições em filmes obtidas pela API pública do Star Wars:  https://swapi.co/ 

## Pré-requisitos

O que você precisa para instalar o software e instalá-lo:


Execução com docker-compose up
```
-Docker - https://www.docker.com/
```
Para rodar local:
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
O Docker vai baixar todas as dependências, realizar build dos pacotes e subir todos os containers com a aplicação:
```sh
$ sudo docker-compose up -d
```
Para rodar local:
```sh
$ sudo mongod - Levantar o Mongo
$ sudo redis-server - Levantar o Redis
$ sudo npm i
$ sudo npm start
```
## Testes

Via Docker
```sh
$ sudo docker-compose -f ./docker-compose-test.yml up
```
Local
```sh
$ sudo npm run test
```
## Endpoints das APIs

- Default: http://localhost:3000/
- POST de Planeta: http://localhost:3000/api/planetas
  - Exemplo de CADASTRO PLANETAS:
  ```sh
  { 'nome': 'Naboo', 
    'clima': 'Frio', 
    'terreno': 'Árido' 
  }
  ```
- GET Listar Planetas: http://localhost:3000/api/planetas

- GET Buscar Planeta por id: http://localhost:3000/api/planetas/:id

- GET Buscar Planeta por nome: http://localhost:3000/api/planetas/findByName/:nome

- DELETE Deletar Planeta: http://localhost:3000/api/planetas/:id

## Melhorias futuras

Percebi alguns pontos que precisam ser melhorados na api:
* JWT para colocar uma segurança nos serviços.
* Quando o planeta é solicitado e não é encontrado no cache(Redis), o serviço salva no cache, conforme requisitado, que expira em 24 horas, podendo ser incluido um schedule para atualizar os planetas conforme a necessidade.
* Incluir login e senha no **Mongo** e no **Redis**.
* Incluir mais testes (Testar a chamada do serviço swapi.co, testar a camada dos router, testar a inclusão no cache).
* Incluir Nyc para estátisticas de cobertura de teste.

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
