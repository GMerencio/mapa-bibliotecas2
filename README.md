# mapa-bibliotecas2

[![Node.js CI](https://github.com/GMerencio/mapa-bibliotecas2/actions/workflows/ci.yaml/badge.svg?branch=main&event=push)](https://github.com/GMerencio/mapa-bibliotecas2/actions/workflows/ci.yaml)

Projeto referente à disciplina PJI310 - Projeto Integrador em Computação III da Univesp. Trata-se de uma aplicação web que visa mapear as bibliotecas universitárias do Brasil e divulgar indicadores quantitativos e de serviços, dando continuidade ao [projeto do semestre anterior](https://github.com/GMerencio/mapa-bibliotecas).

Aplicação em funcionamento: [Mapeamento de Bibliotecas](https://mapa-bibliotecas2.herokuapp.com/)

## Tecnologias

As principais tecnologias utilizadas no projeto são:

* [React](https://reactjs.org/)
* [Leaflet](https://leafletjs.com/) (através do [React Leaflet](https://react-leaflet.js.org/))
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (para testes)

A aplicação é hospedada pelo [Heroku](https://dashboard.heroku.com/), enquanto o banco de dados reside na plataforma do [MongoDB Atlas](https://www.mongodb.com/atlas/database). O mapa emprega o [Mapbox](https://www.mapbox.com/) como provedor de tiles.

## Estrutura do projeto

As principais pastas e arquivos do projeto são:

* `server.js`: O ponto de entrada da aplicação. Estabelece a escuta de requisições.
* `app.js`: Serve os arquivos estáticos do React (localizados na pasta `build`) no ambiente de produção e especifica as rotas do back end.
* `db-connection.js`: Estabelece a conexão com o banco de dados.
* `src`: Pasta contendo os arquivos referentes ao front end (React).
* `api`: Parte principal do back end que responde as requisições do front end.
* `search`: Pasta contendo um script que gera um arquivo `filtros.json` na pasta `src`, utilizado para filtrar o mapa por regiões.
* `tests-backend`: Pasta contendo os scripts de testes de conexão com o banco de dados, endpoints e outros aspectos do back end.
* `.github/workflows/ci.yaml`: Arquivo contendo as configurações de CI através de GitHub Actions.
* `docs`: Arquivos referentes à documentação da API gerada pelo [Swagger](https://swagger.io/) (através do pacote [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)). O arquivo `index.js` importa os demais arquivos, `servers.js` especifica os servidores (locais e remotos) da API, `basicInfo.js` contém as informações básicas da API, `components.js` descreve os esquemas/modelos utilizados pela API e a pasta `ies` descreve cada um dos endpoints.

## Setup 

Execute `npm install` na pasta do projeto. Note que é necessário [instalar o Node e o npm](https://balta.io/blog/node-npm-instalacao-configuracao-e-primeiros-passos) antes. O projeto usa um arquivo `.env` com a seguinte estrutura para armazenar itens como configurações de banco de dados e chaves de acesso de APIs:

```
REACT_APP_TOKEN_MAPBOX = ""
MONGODB_USERNAME = ""
MONGODB_PASSWORD = ""
MONGODB_CLUSTER = ""
MONGODB_DATABASE = ""
MONGODB_COLLECTION = ""
```

Configure e salve o arquivo como `.env` na raiz do projeto. Agora basta executar `npm run dev` para iniciar o servidor de desenvolvimento do React e o servidor Node local.

## Setup (back end)

Após executar `npm install` e configurar o arquivo `.env`, execute `npm run start` para iniciar o servidor Node localmente. Note que `npm run dev` já inicia o servidor Node local junto com o servidor de desenvolvimento, então use esse comando se quiser iniciar apenas o servidor Node. Caso necessário, execute `npm run build` antes desse comando para gerar uma aplicação React estática na pasta `build`.

## Testes

Execute os testes com os comandos `npm run test-react` (testes do front end) e `npm run test-API` (testes do back end). Note que os testes do back end ficam na pasta `tests-backend`, enquanto os testes do front end ficam em `src`; em ambos os casos, os scripts de teste possuem a extensão `.test.js`.

## Deploy

O deploy é realizado automaticamente quando um commit é submetido ao branch `main` e o workflow especificado no script `.github/workflows/ci.yaml` é bem-sucedido. O script roda os comandos de testes do front end e back end; se os testes forem executados corretamente, será realizado o deploy da aplicação no Heroku.